import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student
import Dashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCourses";
import Profile from "./pages/student/Profile";
import Chat from "./pages/student/Chat";
import ContinueLearning from "./pages/student/ContinueLearning";

// Instructor
import InstructorDashboard from "./pages/instructor/Dashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import ManageCourses from "./pages/instructor/ManageCourses";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route path="/student" element={<Dashboard />} />
        <Route path="/student/my-courses" element={<MyCourses />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/chat" element={<Chat />} />
        <Route
          path="/student/continue-learning"
          element={<ContinueLearning />}
        />

        {/* Instructor */}
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route
          path="/instructor/create"
          element={<CreateCourse />}
        />
        <Route
          path="/instructor/courses"
          element={<ManageCourses />}
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />
        <Route
          path="/admin/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;