import { useState } from "react";
import Sidebar from "./Sidebar";

function DashboardLayout({ role, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#152734",
      }}
    >
      <Sidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        style={{
          marginLeft: collapsed ? "80px" : "260px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;