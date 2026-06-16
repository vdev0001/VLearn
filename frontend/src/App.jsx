import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;