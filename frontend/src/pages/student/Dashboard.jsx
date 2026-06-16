import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../StudentDashboard.css";
import DashboardLayout from "../../components/DashboardLayout";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const courseResponse = await axios.get(
          "http://localhost:3000/course",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(courseResponse.data);

        // Fetch current student's enrollments
        const enrollmentResponse = await axios.get(
          `http://localhost:3000/enrollment/student/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnrollments(enrollmentResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, userId]);

  const isEnrolled = (courseId) => {
    return enrollments.some(
      (enrollment) => enrollment.courseId === courseId
    );
  };

  const handleEnroll = async (courseId, instructorId) => {
    try {
      await axios.post(
        "http://localhost:3000/enrollment/create",
        {
          studentId: userId,
          instructorId, // Temporary
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Enrolled successfully! 🎉");

      // Refresh enrollments
      const enrollmentResponse = await axios.get(
        `http://localhost:3000/enrollment/student/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollments(enrollmentResponse.data);
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Enrollment failed!");
      }
    }
  };

  return (
  <DashboardLayout role="student">
    <div className="dashboard">
      <h1>Student Dashboard</h1>

      <h2>Available Courses</h2>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            {isEnrolled(course.id) ? (
              <button className="enrolled-btn" disabled>
                Already Enrolled ✅
              </button>
            ) : (
              <button
                className="enroll-btn"
                onClick={() =>
                  handleEnroll(course.id, course.instructorId)
                }
              >
                Enroll
              </button>
            )}
          </div>
        ))
      )}
    </div>
  </DashboardLayout>
);
}

export default Dashboard;
