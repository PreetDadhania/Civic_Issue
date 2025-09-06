import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{display:'flex', minHeight:'100vh', background:'#18122B'}}>
      {/* Sidebar */}
      <DashboardSidebar />
      {/* Main content */}
      <div style={{flexGrow:1, display:'flex', flexDirection:'column'}}>
        <DashboardTopbar onLogout={handleLogout} />
        <main style={{flexGrow:1, padding:'2.5rem 2.5rem 0 2.5rem', background:'#18122B'}}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
