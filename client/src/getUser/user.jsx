import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7000/api/users");
      console.log("📥 Users fetched:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      alert("Error loading users!");
    } finally {
      setLoading(false);
    }
  };

const deleteUser = async (userId) => {
  await axios
  .delete(`http://localhost:7000/api/users/${userId}`)
  .then((response) =>{
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    alert("User deleted successfully!");
  })
  .catch(error => {
    console.error("❌ Error deleting user:", error);
    alert("Error deleting user!");
  });
};

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-success">User Management</h2>
          <Link to="/add" className="btn btn-primary">
            Add User 👤➕
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="alert alert-info text-center">
            No users found. Click "Add User" to create one!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-success">
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <Link
                        to={`/update/` +user._id}
                        type="button"
                        className="btn btn-info btn-sm me-2"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;