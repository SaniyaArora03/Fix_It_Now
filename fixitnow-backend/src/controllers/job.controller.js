import Job from "../models/Job.js";
import { assignTechnician } from "../utils/assignTechnician.js";


export const createJob = async (req, res) => {
  try {
    const { serviceType, urgency, location, preference } = req.body;

    const job = new Job({
      serviceType,
      urgency,
      userLocation: {
        type: "Point",
        coordinates: [location.lng, location.lat]
      },
      status: "REQUESTED",
      lastStatusUpdate: new Date()
    });

    const technician = await assignTechnician(job, preference);

    if (technician) {
      job.assignedTechnician = technician._id;
      job.status = "ASSIGNED";
      job.assignedAt = new Date();
    }

    await job.save();

    res.status(201).json({
      message: "Job created",
      jobId: job._id,
      status: job.status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAssignedJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      assignedTechnician: req.user.id,
      status: { $ne: "COMPLETED" }
    });

    res.json(job || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const respondToJob = async (req, res) => {
  try {
    const { action } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.assignedTechnician.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your job" });
    }

    if (action === "accept") {
      job.status = "ACCEPTED";
    } else if (action === "reject") {
      job.status = "REQUESTED";
      job.assignedTechnician = null;
    }

    job.lastStatusUpdate = new Date();
    await job.save();

    res.json({ message: "Response recorded", status: job.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.assignedTechnician.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your job" });
    }

    job.status = status;
    job.lastStatusUpdate = new Date();
    await job.save();

    res.json({ message: "Status updated", status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

