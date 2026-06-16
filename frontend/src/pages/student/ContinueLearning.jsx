import DashboardLayout from "../../components/DashboardLayout";

function ContinueLearning() {
  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Continue Learning</h1>

        <div className="course-card">
          <h3>Resume Your Progress</h3>
          <p>
            This page will show courses that you've already enrolled in and
            allow you to continue where you left off.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ContinueLearning;