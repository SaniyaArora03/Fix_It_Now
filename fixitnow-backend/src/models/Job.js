import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  serviceType: String,
  urgency: String,

  userLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  status: {
    type: String,
    enum: ["REQUESTED", "ASSIGNED", "ACCEPTED", "IN_PROGRESS", "COMPLETED"],
    default: "REQUESTED"
  },

  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technician"
  },

  assignedAt: Date,
  lastStatusUpdate: Date,

  escalationLevel: { type: Number, default: 0 }
});

export default mongoose.model("Job", JobSchema);
