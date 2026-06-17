import { useEffect, useState } from "react";
import axios from "axios";

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
    ("Failed to load courses");
    }
  };

  const getCourse = (courseId) => {
    return courses.find(
      (course) => String(course.id) === String(courseId)
    );
  };

  const currentEnrollments = enrollments.filter(
    (e) => !e.completed
  );

  const completedEnrollments = enrollments.filter(
    (e) => e.completed
  );

  const activeEnrollment = currentEnrollments[0];
  const upcomingEnrollments = currentEnrollments.slice(1);

  const getProgress = (enrollment, course) => {
    if (!course?.totalVideos) return 0;

    return Math.min(
      Math.round(
        (enrollment.videosWatched / course.totalVideos) * 100
      ),
      100
    );
  };

  const handleUpdateProgress = async (
    enrollmentId,
    currentVideos
  ) => {
    try {
      const enrollment = enrollments.find(
        (e) => e.id === enrollmentId
      );

      const course = getCourse(enrollment.courseId);

      const nextVideos = Math.min(
        currentVideos + 1,
        course.totalVideos
      );

      await axios.patch(
        `http://localhost:3000/enrollment/progress/${enrollmentId}`,
        {
          videosWatched: nextVideos,
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
                videosWatched: nextVideos,
              }
            : item
        )
      );

      ("Progress Updated 🚀");
    } catch (err) {
      console.error(err);
      ("Failed to update progress");
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

      fetchData();
      
      ("Course Completed 🎉");
    } catch (err) {
      console.error(err);
     ("Failed to complete course");
    }
  };

  const renderProgressBar = (progress) => (
    <div
      style={{
        width: "100%",
        height: "10px",
        background: "#e5e7eb",
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
          background: "#04AA6D",
        }}
      />
    </div>
  );

  return (
    <DashboardLayout role="student">
      <div className="dashboard">
        <h1>My Courses</h1>

        {enrollments.length === 0 && (
          <p>No enrolled courses yet.</p>
        )}

        {/* Current Course */}
        {activeEnrollment && (
          <>
            <h2
              style={{
                color: "#04AA6D",
                marginTop: "20px",
              }}
            >
              Current Course
            </h2>

            {(() => {
              const course = getCourse(
                activeEnrollment.courseId
              );

              if (!course) return null;

              const progress = getProgress(
                activeEnrollment,
                course
              );

              return (
                <div
                  className="course-card"
                  style={{ marginBottom: "25px" }}
                >
                  <h3>{course.title}</h3>

                  <p>{course.description}</p>

                  <p>
                    <strong>Videos Watched:</strong>{" "}
                    {activeEnrollment.videosWatched} /{" "}
                    {course.totalVideos}
                  </p>

                  <p>
                    <strong>Progress:</strong>{" "}
                    {progress}%
                  </p>

                  {renderProgressBar(progress)}

                  <p>
                    <strong>Status:</strong> In
                    Progress
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      className="enroll-btn"
                      onClick={() =>
                        handleUpdateProgress(
                          activeEnrollment.id,
                          activeEnrollment.videosWatched
                        )
                      }
                    >
                      Update Progress
                    </button>

                    <button
                      className="enroll-btn"
                      onClick={() =>
                        handleMarkCompleted(
                          activeEnrollment.id
                        )
                      }
                    >
                      Mark as Completed
                    </button>
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {/* Upcoming Courses */}
        {upcomingEnrollments.length > 0 && (
          <>
            <h2
              style={{
                color: "#04AA6D",
                marginTop: "35px",
              }}
            >
              Upcoming Courses
            </h2>

            {upcomingEnrollments.map((enrollment) => {
              const course = getCourse(
                enrollment.courseId
              );

              if (!course) return null;

              const progress = getProgress(
                enrollment,
                course
              );

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
                    {enrollment.videosWatched} /{" "}
                    {course.totalVideos}
                  </p>

                  {renderProgressBar(progress)}

                  <p>
                    <strong>Status:</strong>{" "}
                    Upcoming
                  </p>
                </div>
              );
            })}
          </>
        )}

        {/* Completed Courses */}
        {completedEnrollments.length > 0 && (
          <>
            <h2
              style={{
                color: "#04AA6D",
                marginTop: "35px",
              }}
            >
              Completed Courses
            </h2>

            {completedEnrollments.map((enrollment) => {
              const course = getCourse(
                enrollment.courseId
              );

              if (!course) return null;

              const progress = getProgress(
                enrollment,
                course
              );

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
                    {enrollment.videosWatched} /{" "}
                    {course.totalVideos}
                  </p>

                  {renderProgressBar(progress)}

                  <p>
                    <strong>Status:</strong>{" "}
                    Completed ✅
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyCourses;