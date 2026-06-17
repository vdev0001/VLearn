import { useEffect, useState } from "react";
import axios from "axios";

import { Pencil, Trash2, Save, X } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";
import "../../pages/InstructorDashboard.css";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState("");
  const [totalVideos, setTotalVideos] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCourses();
  }, []);

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
      ("Failed to fetch courses.");
    }
  };

  const startEdit = (course) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setDescription(course.description);
    setYoutubePlaylistUrl(course.youtubePlaylistUrl);
    setTotalVideos(course.totalVideos.toString());
  };

  const cancelEdit = () => {
    setEditingCourseId(null);
    setTitle("");
    setDescription("");
    setYoutubePlaylistUrl("");
    setTotalVideos("");
  };

  const saveEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/course/${editingCourseId}`,
        {
          title,
          description,
          youtubePlaylistUrl,
          totalVideos: Number(totalVideos),
          instructorId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourseId ? response.data : course
        )
      );

      ("Course updated successfully!");

      cancelEdit();
    } catch (error) {
      console.error(error);
      ("Failed to update course.");
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:3000/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses((prev) =>
        prev.filter((course) => course.id !== courseId)
      );

      ("Course deleted successfully!");
    } catch (error) {
      console.error(error);
      ("Failed to delete course.");
    }
  };

  return (
    <DashboardLayout role="instructor">
      <div className="dashboard">
        <h1
          style={{
            color: "#04AA6D",
            marginBottom: "30px",
          }}
        >
          Manage Courses
        </h1>

        {courses.length === 0 ? (
          <p>No courses created yet.</p>
        ) : (
          courses.map((course) => (
            <div
              className="course-card"
              key={course.id}
              style={{ marginBottom: "25px" }}
            >
              {editingCourseId === course.id ? (
                <>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Course Title"
                  />

                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />

                  <input
                    value={youtubePlaylistUrl}
                    onChange={(e) =>
                      setYoutubePlaylistUrl(e.target.value)
                    }
                    placeholder="Playlist URL"
                  />

                  <input
                    type="number"
                    value={totalVideos}
                    onChange={(e) =>
                      setTotalVideos(e.target.value)
                    }
                  />

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button onClick={saveEdit}>
                      <Save size={16} />
                      &nbsp;Save
                    </button>

                    <button onClick={cancelEdit}>
                      <X size={16} />
                      &nbsp;Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{course.title}</h3>

                  <p>{course.description}</p>

                  <p>
                    <strong>Total Videos:</strong>{" "}
                    {course.totalVideos}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() => startEdit(course)}
                    >
                      <Pencil size={16} />
                      &nbsp;Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCourse(course.id)
                      }
                    >
                      <Trash2 size={16} />
                      &nbsp;Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default ManageCourses;