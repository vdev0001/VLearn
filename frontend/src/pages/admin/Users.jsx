import DashboardLayout from "../../components/DashboardLayout";

function Users() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Manage Users</h1>

        <div className="course-card">
          <h3>User Management</h3>
          <p>
            This page will allow administrators to view, manage, and control
            student and instructor accounts.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Users;