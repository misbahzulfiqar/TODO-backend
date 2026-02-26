import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL parameters
  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/users/${id}`,
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:7000/api/users/${id}`, user)
      .then((res) => {
        console.log(res.data);
        alert("User updated successfully!");
        setUser(users); // Reset form fields
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating user!");
      });
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <Link to="/" type="button" className="btn btn-secondary">
          🔙 Back
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-success text-center text-bold">
              <h4 className="mb-0">Update User</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={inputHandler}
                    value={user.name}
                    name="name"
                    id="name"
                    placeholder="Enter your Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={inputHandler}
                    value={user.email}
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={inputHandler}
                    value={user.address}
                    name="address"
                    id="address"
                    placeholder="Enter your Address"
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
