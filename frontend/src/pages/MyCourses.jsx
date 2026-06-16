import { useEffect, useState } from "react";
import axios from "axios";

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/enrollment/student/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnrollments(response.data);

        const courseResponse = await axios.get(
  "http://localhost:3000/course",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setCourses(courseResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, userId]);

const getCourse = (courseId) => {
  return courses.find((course) => course.id === courseId);
};

const handleUpdateProgress = async (enrollmentId, currentVideos) => {
  try {
    const newVideos = currentVideos + 1;

    await axios.patch(
      `http://localhost:3000/enrollment/progress/${enrollmentId}`,
      {
        videosWatched: newVideos,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Progress updated!");

    // Update the UI without reloading
    setEnrollments((prev) =>
      prev.map((enrollment) =>
        enrollment.id === enrollmentId
          ? { ...enrollment, videosWatched: newVideos }
          : enrollment
      )
    );
  } catch (error) {
  console.error(error);
  console.log(error.response?.data);
  console.log(error.response?.status);
  alert("Failed to update progress");
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

    alert("Course marked as completed!");

    setEnrollments((prev) =>
      prev.map((enrollment) =>
        enrollment.id === enrollmentId
          ? { ...enrollment, completed: true }
          : enrollment
      )
    );
  } catch (error) {
    console.error(error);
    alert("Failed to mark as completed");
  }
};

  return (
    <div>
      <h1>My Courses</h1>

      {enrollments.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        enrollments.map((enrollment) => (
          <div key={enrollment.id}>
            <h3>{getCourse(enrollment.courseId)?.title || "Loading..."}</h3>

<p>{getCourse(enrollment.courseId)?.description}</p>
            <p><strong>Videos Watched:</strong> {enrollment.videosWatched}</p>
            <p>
              <strong>Status:</strong>{" "}
              {enrollment.completed ? "Completed ✅" : "In Progress"}
            </p>
            
            <button onClick={() =>
    handleUpdateProgress(
      enrollment.id,
      enrollment.videosWatched
    )
  }>Update Progress</button>

            <button onClick={() => handleMarkCompleted(enrollment.id)}>Mark as Completed</button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyCourses;