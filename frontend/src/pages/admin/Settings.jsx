import DashboardLayout from "../../components/DashboardLayout";

function Settings() {
  const username =
    localStorage.getItem("username") || "Admin";

  const email =
    localStorage.getItem("email") || "admin@vlearn.com";

  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D", marginBottom: "20px" }}>
          Admin Settings
        </h1>

        <div className="course-card">
          <h2>{username}</h2>

          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Role:</strong> ADMIN
          </p>

          <p style={{ marginTop: "20px" }}>
            You have full access to manage users,
            instructors, students, courses, and
            platform settings.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;