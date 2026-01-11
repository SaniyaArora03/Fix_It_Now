import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import path from "path";
console.log("CWD:", process.cwd());
dotenv.config(); 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
