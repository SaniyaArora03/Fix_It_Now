import express from "express";
import {
  getAssignedJob,
  respondToJob,
  updateJobStatus
} from "../controllers/job.controller.js";

import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roles.js";

const router = express.Router();

router.get(
  "/job",
  auth,
  allowRoles("TECHNICIAN"),
  getAssignedJob
);

router.patch(
  "/jobs/:id/respond",
  auth,
  allowRoles("TECHNICIAN"),
  respondToJob
);

router.patch(
  "/jobs/:id/status",
  auth,
  allowRoles("TECHNICIAN"),
  updateJobStatus
);

export default router;
