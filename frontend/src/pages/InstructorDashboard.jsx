import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../InstructorDashboard.css";
import { PlusCircle, Trash2 } from "lucide-react";
import vlearnLogo from "../../assets/vlearn-logo.png";
import DashboardLayout from "../../components/DashboardLayout";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState("");
  const [totalVideos, setTotalVideos] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);

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
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [token, userId]);

  const handleCreateCourse = async () => {
    // Frontend validation
    if (!title.trim()) {
      toast.error("Please enter a course title.");

      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description.");

      return;
    }

    if (!youtubePlaylistUrl.trim()) {
      toast.error("Please enter a YouTube playlist URL.");

      return;
    }

    if (!totalVideos || Number(totalVideos) <= 0) {
      toast.error("Total Videos must be greater than 0.");

      return;
    }

    try {
      let response;

if (editingCourseId) {
  response = await axios.patch(
    `http://localhost:3000/course/${editingCourseId}`,
    {
      title: title.trim(),
      description: description.trim(),
      youtubePlaylistUrl: youtubePlaylistUrl.trim(),
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

  setEditingCourseId(null);

  toast.success("Course updated successfully!");
} else {
  response = await axios.post(
    "http://localhost:3000/course/create",
    {
      title: title.trim(),
      description: description.trim(),
      youtubePlaylistUrl: youtubePlaylistUrl.trim(),
      totalVideos: Number(totalVideos),
      instructorId: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setCourses((prev) => [...prev, response.data]);

  toast.success("Course created successfully!");
}

// Clear form
setTitle("");
setDescription("");
setYoutubePlaylistUrl("");
setTotalVideos("");

} catch (error) {
  console.error(error);
  toast.error("Failed to save course.");
}
};

  const handleDeleteCourse = async (courseId) => {
  try {
    await axios.delete(
      `http://localhost:3000/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove the deleted course from the UI
    setCourses((prev) =>
      prev.filter((course) => course.id !== courseId)
    );

    toast.success("Course deleted successfully! 🗑️");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete course.");
  }
};

  const isFormValid =
    title.trim() &&
    description.trim() &&
    youtubePlaylistUrl.trim() &&
    Number(totalVideos) > 0;

return (
  <DashboardLayout role="instructor">
  <div className="dashboard">
    
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <img
    src={vlearnLogo}
    alt="VLearn Logo"
    style={{
      width: "100px",
      height: "100px",
      objectFit: "contain",
      borderRadius: "12px",
    }}
  />

  <div>
    <h1
      style={{
        margin: 0,
        color: "#04AA6D",
        fontSize: "42px",
      }}
    >
      Instructor Dashboard
    </h1>

    <p
      style={{
        margin: "6px 0 0",
        color: "#cbd5e1",
      }}
    >
      Create and manage your VLearn courses
    </p>
  </div>
</div>

    <div className="create-course">
      <h2>Create Course</h2>

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="YouTube Playlist URL"
        value={youtubePlaylistUrl}
        onChange={(e) => setYoutubePlaylistUrl(e.target.value)}
      />

      <input
        type="number"
        min="1"
        placeholder="Total Videos"
        value={totalVideos}
        onChange={(e) => setTotalVideos(e.target.value)}
      />

      <button
  onClick={handleCreateCourse}
  disabled={!isFormValid}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  }}
>
  <PlusCircle size={18} />
  {editingCourseId ? "Update Course" : "Create Course"}
</button>

    </div>

    <h2>My Courses</h2>

    {courses.length === 0 ? (
      <p>No courses created yet.</p>
    ) : (
      courses.map((course) => (
        <div className="course-card" key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Total Videos: {course.totalVideos}</p>

<button
  onClick={() => {
  setEditingCourseId(course.id);
  setTitle(course.title);
  setDescription(course.description);
  setYoutubePlaylistUrl(course.youtubePlaylistUrl);
  setTotalVideos(course.totalVideos.toString());
}}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "10px",
  }}
>
  <PlusCircle size={16} />
  Edit Course
</button>

          <button
  onClick={() => handleDeleteCourse(course.id)}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
  }}
>
  <Trash2 size={16} />
  Delete Course
</button>

        </div>
      ))
    )}
  </div>
  </DashboardLayout>
);
}

export default InstructorDashboard;