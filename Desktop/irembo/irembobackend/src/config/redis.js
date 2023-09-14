import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://default:FHdKU1hZziQbA96oDEs7ucriTsjK2cxX@redis-15643.c263.us-east-1-2.ec2.cloud.redislabs.com:15643`,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

export default redisClient;
