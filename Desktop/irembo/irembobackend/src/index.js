import express from "express";
import * as dotenv from 'dotenv';
import cluster from "cluster";
import helmet from "helmet";
import cors from 'cors';
import os from "os";
import rateLimit from 'express-rate-limit'; // Added rate limiting for API endpoints
import xss from 'xss-clean'; // Added protection against XSS attacks
import mongoSanitize from 'express-mongo-sanitize'; // Added protection against NoSQL injection

import routes from "./routes/index";
import connectdb from "./config/database";

dotenv.config();

//cors initial
const allowedOrigins = ['https://irembo.cyclic.app', 'https://irembo.cyclic.app/'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


const numCPUs = os.cpus().length;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Worker processes have an HTTP server.
  const app = express();
  connectdb();
  app.use(express.json());

  // Security Middleware
  app.use(helmet()); // Helmet for various security headers
  app.use(cors(corsOptions));

  // Rate limiting to protect against DDoS attacks
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });
  app.use('/api', limiter);

  // Data sanitization against NoSQL injection
  app.use(mongoSanitize());

  // Data sanitization against XSS attacks
  app.use(xss());

  app.use('/api', routes);

  // Define a route
  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on PORT ${PORT}`);
  });
}
