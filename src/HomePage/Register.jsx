import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegLogin.css';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    contact: "",
    role: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!form.username || !form.password) {
      alert("Username and password are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.username === form.username);
    if (exists) {
      alert("Username already exists!");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input name="contact" placeholder="Contact No" onChange={handleChange} />
      <input name="role" placeholder="Role" onChange={handleChange} />

      <select name="department" value={form.department} onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="Development">Development</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Finance">Finance</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

