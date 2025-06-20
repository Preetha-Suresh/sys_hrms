import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegLogin.css';

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "", // Add role selection
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const matched = users.find(
      (u) =>
        u.username === form.username &&
        u.password === form.password &&
        u.role.toLowerCase() === form.role.toLowerCase()
    );

    if (matched) {
      localStorage.setItem("loggedInUser", JSON.stringify(matched));
      alert("Login successful!");

      // Redirect based on role
      if (form.role.toLowerCase() === "hr") {
        navigate("/dashboard");
      } else {
        navigate("/employee");
      }
    } else {
      alert("Invalid credentials or role mismatch");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="hr">HR</option>
        <option value="employee">Employee</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
