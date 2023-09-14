import { Queue, Worker } from 'bullmq';
import emailService from '../services/email.service';

const queue = new Queue('emailQueue');

const worker = new Worker('emailQueue', async (job) => {
  const { sendTo, subject, htmlTemp } = job.data;
  await emailService(sendTo, subject, htmlTemp);
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

export default queue;
