import express from "express";
import { createJob } from "../controllers/job.controller.js";
import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";

const router=express.Router()  ;

// router.post(
//   "/jobs",
//   auth,
//   allowRoles("CUSTOMER"),
//   createJob
// );
router.post("/jobs", createJob);

export default router;