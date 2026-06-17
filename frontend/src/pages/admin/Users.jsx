import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="dashboard">
        <h1 style={{ color: "#04AA6D", marginBottom: "20px" }}>
          Manage Users
        </h1>

        <div className="course-card">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th align="left" style={{ padding: "12px" }}>
                  Name
                </th>
                <th align="left" style={{ padding: "12px" }}>
                  Email
                </th>
                <th align="left" style={{ padding: "12px" }}>
                  Role
                </th>
                <th align="left" style={{ padding: "12px" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
  {users
    .filter((user) => user.role !== "ADMIN")
    .map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: "12px" }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "ADMIN" && (
                      <button
                        onClick={() =>
                          deleteUser(user.id, user.name)
                        }
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Users;