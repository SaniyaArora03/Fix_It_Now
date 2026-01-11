const BASE_URL = "http://localhost:5000/api";

export async function createJob(payload) {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  return res.json();
}
