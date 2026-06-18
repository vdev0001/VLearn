import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===================== AUTH =====================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ===================== PROTECTED ROUTE =====================
import ProtectedRoute from "./components/ProtectedRoute";

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
// import Analytics from "./pages/admin/Analytics";//
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/continue-learning"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <ContinueLearning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-courses"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/chat"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* INSTRUCTOR */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/create"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <ManageCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/chat"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <InstructorChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/profile"
          element={
            <ProtectedRoute allowedRole="INSTRUCTOR">
              <InstructorProfile />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Courses />
            </ProtectedRoute>
          }
        />

        {/*}
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Analytics />
            </ProtectedRoute>
          }
        />
        */}

<Route path="/register/:role" element={<Register />} />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;