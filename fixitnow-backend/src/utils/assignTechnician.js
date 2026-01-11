import User from "../models/Users.js";

export async function assignTechnician(job) {
  // Find any technician user
  const technician = await User.findOne({
    role: "TECHNICIAN"
  });

  return technician || null;
}
