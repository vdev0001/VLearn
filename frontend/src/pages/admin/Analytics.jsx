import DashboardLayout from "../../components/DashboardLayout";

function Analytics() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D", marginBottom: "20px" }}>
          Analytics
        </h1>

        <div className="course-card">
          <h2>Platform Overview 📊</h2>

          <p>
            This page provides an overview of the VLearn platform.
          </p>

          <ul style={{ marginTop: "15px", lineHeight: "2" }}>
            <li>👨‍🎓 View registered students</li>
            <li>👨‍🏫 Monitor instructors</li>
            <li>📚 Track available courses</li>
            <li>📈 Monitor enrollments and platform growth</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;