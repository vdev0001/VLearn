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

            <Link to="/student/profile">
              <User size={20} />
              {!collapsed && <span>Profile</span>}
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

            <Link to="/instructor/profile">
              <User size={20} />
              {!collapsed && <span>Profile</span>}
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

            <Link to="/admin/analytics">
              <BarChart3 size={20} />
              {!collapsed && <span>Analytics</span>}
            </Link>

            <Link to="/admin/settings">
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </Link>
          </>
        )}

      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        {!collapsed && (
          <div className="user-card">
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