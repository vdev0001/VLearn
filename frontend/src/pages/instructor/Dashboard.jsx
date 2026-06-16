import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout";
import "../../pages/InstructorDashboard.css";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubePlaylistUrl, setYoutubePlaylistUrl] = useState("");
  const [totalVideos, setTotalVideos] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleCreateCourse = async () => {
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
      await axios.post(
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

      toast.success("Course created successfully! 🎉");

      setTitle("");
      setDescription("");
      setYoutubePlaylistUrl("");
      setTotalVideos("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course.");
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
        <div className="create-course">
          <h1
            style={{
              color: "#04AA6D",
              marginBottom: "20px",
            }}
          >
            Create New Course
          </h1>

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
            Create Course
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateCourse;