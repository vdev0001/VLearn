import DashboardLayout from "../../components/DashboardLayout";

function Profile() {
  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1>My Profile</h1>

        <div className="course-card">
          <p><strong>Username:</strong> {localStorage.getItem("username")}</p>
          <p><strong>Email:</strong> {localStorage.getItem("email")}</p>
          <p><strong>Role:</strong> {localStorage.getItem("role")}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;