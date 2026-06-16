import DashboardLayout from "../../components/DashboardLayout";

function Courses() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Manage Courses</h1>

        <div className="course-card">
          <h3>Course Management</h3>
          <p>
            This page will allow the admin to view, manage, and moderate all
            courses on the platform.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Courses;