import { useEffect, useState } from "react";
import axios from "axios";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/course/instructor/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [token, userId]);

  return (
    <div>
      <h1>Instructor Dashboard</h1>

      <h2>My Courses</h2>

      {courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Total Videos: {course.totalVideos}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default InstructorDashboard;