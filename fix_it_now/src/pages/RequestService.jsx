import { useState } from "react";
import useLocation from "../hooks/useLocation";
import MapView from "../components/MapView";
import { createJob } from "../services/api";
import Layout from "../components/Layout";

export default function RequestService({ onLogout }) {
  const { location, error } = useLocation();

  const [serviceType, setServiceType] = useState("electrician");
  const [urgency, setUrgency] = useState("normal");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Location not available");
      return;
    }

    try {
      setLoading(true);
      setStatus("Finding technician...");

      const payload = {
        serviceType,
        urgency,
        preference: "fastest",
        location
      };

      const response = await createJob(payload);

      setStatus(
        response.status === "ASSIGNED"
          ? "Technician assigned. Waiting for response."
          : "Request sent. Looking for technician..."
      );
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },

  title: {
    fontSize: "1.6rem",
    fontWeight: 600
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer"
  },

  card: {
    background: "#ffffff",
    padding: 24,
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    maxWidth: 420,
    marginBottom: 24
  },

  form: {
    display: "grid",
    gap: 16
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  label: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#374151"
  },

  select: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: "0.95rem"
  },

  submitBtn: {
    marginTop: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 6,
    fontSize: "1rem",
    cursor: "pointer"
  },

  status: {
    marginTop: 16,
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#2563eb"
  },

  error: {
    color: "#dc2626",
    marginBottom: 12
  },

  mapCard: {
    background: "#ffffff",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  }
};

  return (
  <Layout>
   
    <div style={styles.header}>
      <h2 style={styles.title}>Request a Service</h2>
      <button style={styles.logoutBtn} onClick={onLogout}>
        Logout
      </button>
    </div>

    
    <div style={styles.card}>
      
      {error && <p style={styles.error}>{error}</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            style={styles.select}
          >
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="ac">AC Repair</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Urgency</label>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            style={styles.select}
          >
            <option value="normal">Normal</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.submitBtn,
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Requesting..." : "Request Service"}
        </button>
      </form>

     
      {status && <p style={styles.status}>{status}</p>}
    </div>

    {/* MAP CARD */}
    <div style={styles.mapCard}>
      <MapView location={location} />
    </div>
  </Layout>
);
}