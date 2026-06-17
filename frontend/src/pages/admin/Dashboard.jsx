import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import { Users, BookOpen, GraduationCap } from "lucide-react";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
        axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/course", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/enrollment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setTotalUsers(usersRes.data.length);
      setTotalCourses(coursesRes.data.length);
      setTotalEnrollments(enrollmentsRes.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D", marginBottom: "20px" }}>
          Admin Dashboard
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
            <Users size={32} color="#04AA6D" />
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>

          <div className="course-card">
            <BookOpen size={32} color="#04AA6D" />
            <h3>{totalCourses}</h3>
            <p>Total Courses</p>
          </div>

          <div className="course-card">
            <GraduationCap size={32} color="#04AA6D" />
            <h3>{totalEnrollments}</h3>
            <p>Total Enrollments</p>
          </div>
        </div>

        <div className="course-card" style={{ marginTop: "30px" }}>
          <h2>Welcome Admin 👋</h2>

          <p>
            You are managing{" "}
            <strong>{totalUsers}</strong> users,
            <strong> {totalCourses}</strong> courses and
            <strong> {totalEnrollments}</strong> enrollments.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;