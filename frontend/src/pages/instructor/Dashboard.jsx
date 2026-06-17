import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import { BookOpen, Users, PlusCircle } from "lucide-react";

function Dashboard() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [courseRes, enrollmentRes] = await Promise.all([
        axios.get(
          `http://localhost:3000/course/instructor/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          `http://localhost:3000/enrollment/instructor/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      setTotalCourses(courseRes.data.length);
      const uniqueStudents = new Set(
  enrollmentRes.data.map((enrollment) => enrollment.studentId)
);

setTotalStudents(uniqueStudents.size);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout role="instructor">
      <div className="dashboard">
        <h1
          style={{
            color: "#04AA6D",
            marginBottom: "20px",
          }}
        >
          Instructor Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="course-card">
            <BookOpen size={32} color="#04AA6D" />
            <h3>{totalCourses}</h3>
            <p>Total Courses Created</p>
          </div>

          <div className="course-card">
            <Users size={32} color="#04AA6D" />
            <h3>{totalStudents}</h3>
            <p>Total Enrolled Students</p>
          </div>

        </div>

        <div
          className="course-card"
          style={{ marginTop: "30px" }}
        >
          <h2>Welcome Instructor 👋</h2>

          <p>
            You have created <strong>{totalCourses}</strong>{" "}
            course{totalCourses !== 1 ? "s" : ""} with{" "}
            <strong>{totalStudents}</strong>{" "}
            enrolled student{totalStudents !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;