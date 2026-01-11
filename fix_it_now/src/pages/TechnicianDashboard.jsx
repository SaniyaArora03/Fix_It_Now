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

  return (
    <Layout title="Technician Dashboard">
      <h2>Technician Dashboard</h2>

      
      <button onClick={onLogout}>Logout</button>

      <JobCard
        job={job}
        onAccept={handleAccept}
        onReject={handleReject}
        onStatusChange={handleStatusChange}
      />
    </Layout>
  );
}
