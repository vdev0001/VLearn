import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const { role } = useParams();

  const userRole =
    role === "instructor" ? "instructor" : "student";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:3000/auth/register/${userRole}`,
        {
          name,
          email,
          password,
        }
      );

      navigate("/", {
        state: {
          success:
            "Registration successful! Please wait for admin approval before logging in.",
        },
      });
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>
          Register as{" "}
          {userRole === "student"
            ? "Student"
            : "Instructor"}
        </h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            color: "#d1d5db",
          }}
        >
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Register;