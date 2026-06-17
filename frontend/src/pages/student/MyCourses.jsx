import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";

function MyCourses() {
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    }
  };

  const getCourse = (courseId) => {
    return courses.find(
      (course) => String(course.id) === String(courseId)
    );
  };

  const handleUpdateProgress = async (enrollmentId, currentVideos) => {
    try {
      await axios.patch(
        `http://localhost:3000/enrollment/progress/${enrollmentId}`,
        {
          videosWatched: Math.min(
  currentVideos + 1,
  courses.find(
    (c) =>
      c.id ===
      enrollments.find((e) => e.id === enrollmentId)?.courseId
  )?.totalVideos || currentVideos + 1
),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollments((prev) =>
        prev.map((item) =>
          item.id === enrollmentId
            ? {
                ...item,
                videosWatched: currentVideos + 1,
              }
            : item
        )
      );

      toast.success("Progress Updated 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update progress");
    }
  };

  const handleMarkCompleted = async (enrollmentId) => {
    try {
      await axios.patch(
        `http://localhost:3000/enrollment/complete/${enrollmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrollments((prev) =>
        prev.map((item) =>
          item.id === enrollmentId
            ? {
                ...item,
                completed: true,
              }
            : item
        )
      );

      toast.success("Course Completed 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete course");
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1>My Courses</h1>

        {enrollments.length === 0 ? (
          <p>No enrolled courses yet.</p>
        ) : (
          enrollments.map((enrollment) => {
            const course = getCourse(enrollment.courseId);

            // Ignore invalid/stale enrollments
            if (!course) return null;

            const progress = course.totalVideos
  ? Math.min(
      Math.round(
        (enrollment.videosWatched / course.totalVideos) * 100
      ),
      100
    )
  : 0;

            return (
              <div
                key={enrollment.id}
                className="course-card"
                style={{ marginBottom: "25px" }}
              >
                <h3>{course.title}</h3>

                <p>{course.description}</p>

                <p>
  <strong>Videos Watched:</strong>{" "}
  {enrollment.videosWatched} / {course.totalVideos}
</p>

<p>
  <strong>Progress:</strong> {progress}%
</p>

<div
  style={{
    width: "100%",
    height: "10px",
    backgroundColor: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "8px",
    marginBottom: "15px",
  }}
>
  <div
    style={{
      width: `${progress}%`,
      height: "100%",
      backgroundColor: "#04AA6D",
      transition: "width 0.3s ease",
    }}
  />
</div>

                <p>
                  <strong>Status:</strong>{" "}
                  {enrollment.completed
                    ? `Completed ✅ (${progress}%)`
                  : `In Progress (${progress}%)`}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "18px",
                    flexWrap: "wrap",
                  }}
                >
                 <button
  className="enroll-btn"
  disabled={
    enrollment.completed ||
    enrollment.videosWatched >= course.totalVideos
  }
  onClick={() =>
    handleUpdateProgress(
      enrollment.id,
      enrollment.videosWatched
    )
  }
>
  Update Progress
</button>

                  {!enrollment.completed && (
                    <button
                      className="enroll-btn"
                      onClick={() =>
                        handleMarkCompleted(enrollment.id)
                      }
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyCourses;