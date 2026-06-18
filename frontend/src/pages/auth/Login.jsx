import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";


function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        }
      );

      const { accessToken, user } = response.data;

      // Store user data
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.role);
      localStorage.setItem(
        "username",
        user.username || user.name || "User"
      );
      localStorage.setItem("email", user.email);

      // Role-based navigation
      switch (user.role) {
        case "STUDENT":
          navigate("/student", { replace: true });
          break;

        case "INSTRUCTOR":
          navigate("/instructor", { replace: true });
          break;

        case "ADMIN":
          navigate("/admin", { replace: true });
          break;

        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    }
  };

return (
  <div className="login-page">
    <div className="login-card">
      <h1>Here VLearn</h1>
      <p>Welcome back! Login in for VLearn</p>

      {location.state?.success && (
  <div
    style={{
      background: "#14532d",
      color: "#bbf7d0",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "16px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "500",
    }}
  >
    ✅ {location.state.success}
  </div>
)}

      

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

  <p
  style={{
    textAlign: "center",
    color: "#d1d5db", // 👈 Font color
    marginTop: "20px",
    marginBottom: "5px",
    fontSize: "18px",
    fontWeight: "600",
  }}
>
  New to VLearn?
</p>

<p
  style={{
    textAlign: "center",
    color: "#9ca3af", // 👈 Light gray
    marginBottom: "15px",
    fontSize: "17px",
  }}
>
  Register as
</p>


<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "12px",
  }}
>
  <button
    type="button"
    onClick={() => navigate("/register/student")}
    className="register-btn"
  >
    Student
  </button>

  <button
    type="button"
    onClick={() => navigate("/register/instructor")}
    className="register-btn"
  >
    Instructor
  </button>
</div>
    </div>
  </div>
);
}

export default Login;