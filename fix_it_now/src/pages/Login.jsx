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
      
      const { token, role } = await login(email, password);

      setAuth(token, role);

      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fa"
  },

  card: {
    background: "#ffffff",
    padding: 32,
    borderRadius: 10,
    width: 360,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 14
  },

  title: {
    marginBottom: 4,
    fontSize: "1.5rem",
    fontWeight: 600,
    textAlign: "center"
  },

  subtitle: {
    marginBottom: 16,
    fontSize: "0.9rem",
    color: "#6b7280",
    textAlign: "center"
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: "0.95rem"
  },

  button: {
    marginTop: 8,
    padding: "10px",
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "1rem",
    cursor: "pointer"
  },

  error: {
    color: "#dc2626",
    fontSize: "0.9rem",
    textAlign: "center"
  },

  switch: {
    marginTop: 12,
    fontSize: "0.9rem",
    textAlign: "center",
    cursor: "pointer",
    color: "#374151"
  },

  link: {
    color: "#2563eb",
    fontWeight: 500
  }
};


  return (
  <div style={styles.wrapper}>
    <form onSubmit={handleSubmit} style={styles.card}>
      <h2 style={styles.title}>Welcome Back</h2>
      <p style={styles.subtitle}>Login to continue</p>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />

      <button type="submit" style={styles.button}>
        Login
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.switch} onClick={onSwitch}>
        New user? <span style={styles.link}>Register</span>
      </p>
    </form>
  </div>
);

}
