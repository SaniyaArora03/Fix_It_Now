import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Layout from "../components/Layout";
import {
  getAssignedJob,
  respondToJob,
  updateJobStatus
} from "../services/technicianApi";

export default function TechnicianDashboard({ onLogout }) {
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    const data = await getAssignedJob(); 
    setJob(data);
  };

  useEffect(() => {
    fetchJob();
    const interval = setInterval(fetchJob, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async () => {
    await respondToJob(job._id, "accept");
    fetchJob();
  };

  const handleReject = async () => {
    await respondToJob(job._id, "reject");
    fetchJob();
  };

  const handleStatusChange = async (status) => {
    await updateJobStatus(job._id, status);
    fetchJob();
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
    fontWeight: 600,
    marginBottom: 4
  },

  subtitle: {
    fontSize: "0.9rem",
    color: "#6b7280"
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
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    maxWidth: 600
  },

  empty: {
    color: "#6b7280",
    fontSize: "0.95rem",
    textAlign: "center",
    padding: 24
  }
};

  return (
  <Layout title="Technician Dashboard">
   
    <div style={styles.header}>
      <div>
        <h2 style={styles.title}>Technician Dashboard</h2>
        <p style={styles.subtitle}>Manage your assigned job</p>
      </div>

      <button style={styles.logoutBtn} onClick={onLogout}>
        Logout
      </button>
    </div>

    
    <div style={styles.card}>
      {job ? (
        <JobCard
          job={job}
          onAccept={handleAccept}
          onReject={handleReject}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <p style={styles.empty}>
          No active job assigned right now.
        </p>
      )}
    </div>
  </Layout>
);

}
