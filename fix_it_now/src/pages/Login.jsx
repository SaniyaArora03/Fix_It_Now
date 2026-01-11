import { useState, useEffect } from "react";
import { login } from "../services/authApi";
import { setAuth } from "../utils/auth";

export default function Login({ onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ await is CRITICAL
      const { token, role } = await login(email, password);

      setAuth(token, role);

      // ✅ tell App.jsx auth changed
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />

      <button type="submit">Login</button>

      {error && <p>{error}</p>}

      <p
        onClick={onSwitch}
        style={{ cursor: "pointer", color: "blue" }}
      >
        New user? Register
      </p>
    </form>
  );
}
