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

  return (
    <Layout style={{ padding: 20 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Request a Service</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      {/* LOCATION ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* REQUEST FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div>
          <label>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="ac">AC Repair</option>
          </select>
        </div>

        <div>
          <label>Urgency</label>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Requesting..." : "Request Service"}
        </button>
      </form>

      {/* STATUS MESSAGE */}
      {status && <p>{status}</p>}

      {/* MAP */}
      <MapView location={location} />
    </Layout>
  );
}
