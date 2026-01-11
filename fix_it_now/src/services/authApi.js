const BASE_URL = "http://localhost:5000/api";

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // { token, role }
}
export async function register(name, email, password, role) {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}
