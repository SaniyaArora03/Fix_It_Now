import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:5000/api";

export async function createJob(payload) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/user/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  return res.json();
}
