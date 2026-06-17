import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function Courses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/course", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

const deleteCourse = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCourses(); // Refresh the list
  } catch (error) {
    console.error(error);
  }
};

  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1
          style={{
            color: "#04AA6D",
            marginBottom: "20px",
          }}
        >
          Manage Courses
        </h1>

        <div className="course-card">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th align="left">Title</th>
                <th align="left">Description</th>
                <th align="left">Videos</th>
                <th align="left">Action</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td style={{ padding: "12px 0" }}>
                    {course.title}
                  </td>

                  <td>{course.description}</td>

                  <td>{course.totalVideos}</td>

                  <td>
                    <button
  onClick={() => deleteCourse(course.id)}
  style={{
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Delete
</button>
                  </td>
                </tr>
              ))}

              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Courses;