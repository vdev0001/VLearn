import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function ContinueLearning() {
  const [currentEnrollment, setCurrentEnrollment] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCurrentCourse();
  }, []);

  const fetchCurrentCourse = async () => {
    try {
      // Get all enrollments
      const enrollmentRes = await axios.get(
        `http://localhost:3000/enrollment/student/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Find first incomplete enrollment
      const activeEnrollment = enrollmentRes.data.find(
        (e) => !e.completed
      );

      if (!activeEnrollment) {
        setCurrentEnrollment(null);
        setCurrentCourse(null);
        return;
      }

      setCurrentEnrollment(activeEnrollment);

      // Get all courses
      const courseRes = await axios.get(
        "http://localhost:3000/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const course = courseRes.data.find(
        (c) =>
          String(c.id) ===
          String(activeEnrollment.courseId)
      );

      setCurrentCourse(course || null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    if (currentCourse?.youtubePlaylistUrl) {
      window.open(
        currentCourse.youtubePlaylistUrl,
        "_blank"
      );
    }
  };

  const progress =
    currentCourse && currentEnrollment
      ? Math.min(
          Math.round(
            (currentEnrollment.videosWatched /
              currentCourse.totalVideos) *
              100
          ),
          100
        )
      : 0;

  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>
          Continue Learning
        </h1>

        {!currentEnrollment || !currentCourse ? (
          <div className="course-card">
            <h3>No Active Course 🎉</h3>
            <p>
              You have completed all your current
              courses.
            </p>
          </div>
        ) : (
          <div
            className="course-card"
            style={{ marginTop: "20px" }}
          >
            <h2>{currentCourse.title}</h2>

            <p>{currentCourse.description}</p>

            <p>
              <strong>Videos Watched:</strong>{" "}
              {currentEnrollment.videosWatched} /{" "}
              {currentCourse.totalVideos}
            </p>

            <p>
              <strong>Progress:</strong> {progress}%
            </p>

            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
                margin: "12px 0",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#04AA6D",
                }}
              />
            </div>

            <button
              className="enroll-btn"
              onClick={handleContinue}
            >
              Continue Learning ▶
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ContinueLearning;