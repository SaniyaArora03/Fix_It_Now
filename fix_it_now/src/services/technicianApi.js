import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:5000/api";

export async function getAssignedJob() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/technician/job`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch assigned job");
  }

  return res.json();
}

export async function respondToJob(jobId, action) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/jobs/${jobId}/respond`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ action })
  });

  return res.json();
}

export async function updateJobStatus(jobId, status) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/jobs/${jobId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  return res.json();
}
