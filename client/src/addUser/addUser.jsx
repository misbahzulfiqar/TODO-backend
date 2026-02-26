import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
    const users ={
        name: "",
        email: "",
        address: "",
    };
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    };

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/api/users", user)
            .then(res => {
                console.log(res.data);
                alert("User added successfully!");
                setUser(users); // Reset form fields
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                alert("Error adding user!");
            });
    };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <Link
          to="/"
          type="button"
          className="btn btn-secondary"       
        >
          🔙 Back
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-success text-center text-bold">
              <h4 className="mb-0">ADD NEW USER</h4>
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
                    name="address"
                    id="address"
                    placeholder="Enter your Address"
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default AddUser;