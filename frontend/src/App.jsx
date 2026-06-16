import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===================== AUTH =====================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ===================== STUDENT =====================
import Dashboard from "./pages/student/Dashboard";
import ContinueLearning from "./pages/student/ContinueLearning";
import MyCourses from "./pages/student/MyCourses";
import Chat from "./pages/student/Chat";
import Profile from "./pages/student/Profile";

// ===================== INSTRUCTOR =====================
import InstructorDashboard from "./pages/instructor/Dashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import ManageCourses from "./pages/instructor/ManageCourses";
import InstructorChat from "./pages/instructor/Chat";
import InstructorProfile from "./pages/instructor/Profile";

// ===================== ADMIN =====================
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===================== AUTH ===================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===================== STUDENT ===================== */}
        <Route path="/student" element={<Dashboard />} />
        <Route
          path="/student/continue-learning"
          element={<ContinueLearning />}
        />
        <Route
          path="/student/my-courses"
          element={<MyCourses />}
        />
        <Route
          path="/student/chat"
          element={<Chat />}
        />
        <Route
          path="/student/profile"
          element={<Profile />}
        />

        {/* ===================== INSTRUCTOR ===================== */}
        <Route
          path="/instructor"
          element={<InstructorDashboard />}
        />
        <Route
          path="/instructor/create"
          element={<CreateCourse />}
        />
        <Route
          path="/instructor/courses"
          element={<ManageCourses />}
        />
        <Route
          path="/instructor/chat"
          element={<InstructorChat />}
        />
        <Route
          path="/instructor/profile"
          element={<InstructorProfile />}
        />

        {/* ===================== ADMIN ===================== */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/users"
          element={<Users />}
        />
        <Route
          path="/admin/courses"
          element={<Courses />}
        />
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