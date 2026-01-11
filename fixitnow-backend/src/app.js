import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import technicianRoutes from "./routes/technician.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/technician", technicianRoutes);

export default app;
