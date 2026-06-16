import DashboardLayout from "../../components/DashboardLayout";

function Analytics() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Analytics</h1>

        <div className="course-card">
          <h3>Platform Analytics</h3>
          <p>This page will display platform statistics and reports.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;