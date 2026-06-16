import DashboardLayout from "../../components/DashboardLayout";

function Settings() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Settings</h1>

        <div className="course-card">
          <h3>Platform Settings</h3>
          <p>
            This page will contain application settings and configuration
            options for administrators.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;