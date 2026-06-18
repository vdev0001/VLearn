import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";

function Users() {
  const [users, setUsers] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

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

  const deleteUser = async (id) => {

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
  onClick={() => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }}
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

      {showDeleteModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#1f2937",
        padding: "24px",
        borderRadius: "12px",
        width: "360px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#04AA6D", marginBottom: "10px" }}>
        Delete User
      </h2>

      <p style={{ color: "white", marginBottom: "20px" }}>
        Are you sure you want to delete{" "}
        <strong>{selectedUser?.name}</strong>?
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          style={{
            background: "#6b7280",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            deleteUser(selectedUser.id);
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </DashboardLayout>
  );
}

export default Users;