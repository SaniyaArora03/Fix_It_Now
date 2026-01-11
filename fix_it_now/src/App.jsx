import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestService from "./pages/RequestService";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import { getRole, logout } from "./utils/auth";

export default function App() {
  const [role, setRole] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setRole(getRole());
  }, []);

  const refreshAuth = () => {
    setRole(getRole());
  };

  const handleLogout = () => {
    logout();
    setRole(null);
  };

  if (!role) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login
        onSwitch={() => setShowRegister(true)}
        onLogin={refreshAuth}
      />
    );
  }

  if (role === "CUSTOMER")
    return <RequestService onLogout={handleLogout} />;

  if (role === "TECHNICIAN")
    return <TechnicianDashboard onLogout={handleLogout} />;

  handleLogout();
  return null;
}
