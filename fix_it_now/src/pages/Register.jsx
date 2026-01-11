import { useState } from "react";
import { register } from "../services/authApi";

export default  function Register({ onSwitch }){
   const[name,setName]=useState("") ;
   const[email,setEmail]=useState("") ;
   const[password,setPassword]=useState("") ;
   const[role,setRole]=useState("CUSTOMER") ;
   const[error,setError]=useState("") ;

   const handleSubmit =async(e) =>{
    e.preventDefault();
    alert("HANDLE SUBMIT CALLED");
    try {
      await register(name, email, password, role);
      onSwitch(); 
    } catch {
      setError("Registration failed");
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

  select: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    background: "#fff"
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
      <h2 style={styles.title}>Create Account</h2>
      <p style={styles.subtitle}>Join FixItNow</p>

      <input
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        style={styles.select}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="CUSTOMER">Customer</option>
        <option value="TECHNICIAN">Technician</option>
      </select>

      <button type="submit" style={styles.button}>
        Create Account
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.switch} onClick={onSwitch}>
        Already have an account? <span style={styles.link}>Login</span>
      </p>
    </form>
  </div>
);

}    