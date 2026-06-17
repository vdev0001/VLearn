import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";

function ContinueLearning() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const enrollmentRes = await axios.get(
        `http://localhost:3000/enrollment/student/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const courseRes = await axios.get(
        "http://localhost:3000/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollments(enrollmentRes.data);
      setCourses(courseRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load enrolled courses");
    }
  };

  const getCourse = (courseId) => {
    return courses.find(
      (course) => String(course.id) === String(courseId)
    );
  };

const handleContinue = (course) => {
  if (course?.youtubePlaylistUrl) {
    window.open(course.youtubePlaylistUrl, "_blank");
  } else {
    toast.info("Video link not available for this course.");
  }
};

  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D" }}>Continue Learning</h1>

        {enrollments.length === 0 ? (
          <p>You haven't enrolled in any courses yet.</p>
        ) : (
          enrollments.map((enrollment) => {
            const course = getCourse(enrollment.courseId);

            if (!course) return null;

            return (
              <div
                key={enrollment.id}
                className="course-card"
                style={{ marginBottom: "20px" }}
              >
                <h3>{course.title}</h3>

                <p>{course.description}</p>

                <p>
                  <strong>Videos Watched:</strong>{" "}
                  {enrollment.videosWatched}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {enrollment.completed
                    ? "Completed ✅"
                    : "In Progress"}
                </p>

                <button
                  className="enroll-btn"
                  onClick={() => handleContinue(course)}
                >
                  Continue Learning ▶
                </button>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}

export default ContinueLearning;