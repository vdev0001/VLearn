import { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/course",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response.data);

        const enrollmentResponse = await axios.get(
  "http://localhost:3000/enrollment/student/5210519c-3fe7-42ad-9604-ff76646c95ff",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setEnrollments(enrollmentResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);


const isEnrolled = (courseId) => {
  return enrollments.some(
    (enrollment) => enrollment.courseId === courseId
  );
};

const handleEnroll = async (courseId) => {
  try {
    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("userId");

    await axios.post(
      "http://localhost:3000/enrollment/create",
      {
        studentId:userId,
        instructorId: "cf43e1c0-f4aa-42bc-9784-d30096375c29",
        courseId: courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Enrolled successfully!");

    window.location.reload();

     const enrollmentResponse = await axios.get(`http://localhost:3000/enrollment/student/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    
  setEnrollments(enrollmentResponse.data);
  }
  catch (error) {
  console.error(error);

  if (error.response?.data?.message) {
    alert(error.response.data.message);
  } else {
    alert("Enrollment failed!");
  }
}
};

return (
    <div>
      <h1>Student Dashboard</h1>

      <h2>Available Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          
          {isEnrolled(course.id) ? (
  <button disabled>Already Enrolled ✅</button>
) : (
       <button  onClick={() => handleEnroll(course.id)}>Enroll</button>)}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;