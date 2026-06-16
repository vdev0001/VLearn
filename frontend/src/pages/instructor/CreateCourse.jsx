import DashboardLayout from "../../components/DashboardLayout";

function CreateCourse() {
  return (
    <DashboardLayout role="instructor">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Create Course</h1>

        <div className="course-card">
          <h3>Create a New Course</h3>
          <p>
            This page will contain the course creation form. You can add the
            form back after the routing structure is stable.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateCourse;