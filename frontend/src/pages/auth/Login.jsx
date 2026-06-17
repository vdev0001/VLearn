import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

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
          navigate("/student");
          break;

        case "INSTRUCTOR":
          navigate("/instructor");
          break;

        case "ADMIN":
          navigate("/admin");
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
      <p>Welcome back! sign in for VLearn</p>

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
    </div>
  </div>
);
}

export default Login;