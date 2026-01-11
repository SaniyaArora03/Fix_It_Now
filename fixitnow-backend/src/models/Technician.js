import mongoose from "mongoose";
const TechnicianSchema=new mongoose.Schema({
    name:String,
    skills:[String],
    isOnline: { type: Boolean, default: true },
    location:{
        type:{
      type: String,
      enum: ["Point"],
      required: true
        },
        coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
    },
     activeJobs: { type: Number, default: 0 },
  jobsToday: { type: Number, default: 0 },
  fatigueScore: { type: Number, default: 0 },
  lastJobCompletedAt: Date

});
TechnicianSchema.index({ location: "2dsphere" });
export default mongoose.model("Technician", TechnicianSchema);