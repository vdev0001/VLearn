import { Link } from "react-router-dom";
import {
  Menu,
  ChevronLeft,
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  User,
  LogOut,
  Users,
  BarChart3,
  Settings,
  PlayCircle,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({ role, collapsed, setCollapsed }) {
  // Temporary values (replace with API/user context later)
  const username = localStorage.getItem("username") || "VLearn User";
  const email = localStorage.getItem("email") || "user@vlearn.com";

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>

        {!collapsed && <h2 className="sidebar-logo">VLearn</h2>}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        {/* ===================== STUDENT ===================== */}
        {role === "student" && (
          <>
            <Link to="/student">
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link to="/student/continue-learning">
              <PlayCircle size={20} />
              {!collapsed && <span>Continue Learning</span>}
            </Link>

            <Link to="/student/my-courses">
              <BookOpen size={20} />
              {!collapsed && <span>My Courses</span>}
            </Link>

          </>
        )}

        {/* ===================== INSTRUCTOR ===================== */}
        {role === "instructor" && (
          <>
            <Link to="/instructor">
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link to="/instructor/create">
              <PlusCircle size={20} />
              {!collapsed && <span>Create Course</span>}
            </Link>

            <Link to="/instructor/courses">
              <BookOpen size={20} />
              {!collapsed && <span>Manage Courses</span>}
            </Link>

          </>
        )}

        {/* ===================== ADMIN ===================== */}
        {role === "admin" && (
          <>
            <Link to="/admin">
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link to="/admin/users">
              <Users size={20} />
              {!collapsed && <span>Manage Users</span>}
            </Link>

            <Link to="/admin/courses">
              <BookOpen size={20} />
              {!collapsed && <span>Manage Courses</span>}
            </Link>
          </>
        )}

      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
  {!collapsed && (
    <div
      className="user-card"
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (role === "student") {
          window.location.href = "/student/profile";
        } else if (role === "instructor") {
          window.location.href = "/instructor/profile";
        } else if (role === "admin") {
          window.location.href = "/admin/settings";
        }
      }}
    >
      <div className="avatar">
        {username.charAt(0).toUpperCase()}
      </div>

      <div>
        <div className="user-name">{username}</div>
        <div className="user-email">{email}</div>
      </div>
    </div>
  )}

  <button
    className="logout-link"
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      window.location.href = "/";
    }}
  >
    <LogOut size={20} />
    {!collapsed && <span>Logout</span>}
  </button>
</div>
    </aside>
  );
}

export default Sidebar;