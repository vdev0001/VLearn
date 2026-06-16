import DashboardLayout from "../../components/DashboardLayout";

function Profile() {
  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "user@example.com";
  const role = localStorage.getItem("role") || "Unknown";

  return (
    <DashboardLayout role={role.toLowerCase()}>
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>My Profile</h1>

        <div className="course-card">
          <h3>{username}</h3>
          <p>Email: {email}</p>
          <p>Role: {role}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;