import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("role", response.data.user.role);

    localStorage.setItem(
  "username",
  response.data.user.username || response.data.user.name || "User"
);

localStorage.setItem(
  "email",
  response.data.user.email
);

    if (response.data.user.role === "INSTRUCTOR") {
      navigate("/instructor");
    } else if (response.data.user.role === "STUDENT") {
      navigate("/student");
    } else {
      navigate("/");
    }

    console.log(response.data);
    console.log(response.data.user);
    console.log("Token saved successfully!");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>VLearn Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;