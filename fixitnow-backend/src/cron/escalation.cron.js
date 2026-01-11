import cron from "node-cron";
import Job from "../models/Job.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const jobs = await Job.find({ status: { $ne: "COMPLETED" } });

  for (let job of jobs) {
    const diff = (now - job.lastStatusUpdate) / 60000;

    if (job.status === "ASSIGNED" && diff > 2) job.escalationLevel = 1;
    if (job.status === "ACCEPTED" && diff > 5) job.escalationLevel = 2;
    if (job.status === "IN_PROGRESS" && diff > 15) job.escalationLevel = 3;

    await job.save();
  }
});
