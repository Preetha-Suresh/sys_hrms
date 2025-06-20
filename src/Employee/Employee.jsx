import React, { useState } from "react";
import "./Employee.css";

const Employee = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const [availableLeaves, setAvailableLeaves] = useState(10);
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const [attendance] = useState([
    { date: "2025-06-17", status: "Present" },
    { date: "2025-06-16", status: "Absent" },
    { date: "2025-06-15", status: "Present" },
  ]);

  const [training] = useState([
    { module: "HR Policy Basics", status: "Completed" },
    { module: "Diversity Training", status: "In Progress" },
  ]);

  const [payslip] = useState([
    {
      id: "PAY123",
      basic: 30000,
      allowance: 5000,
      deductions: 2000,
      netPay: 33000,
      status: "Paid",
    },
  ]);

  const handleLeaveApply = () => {
    if (!leaveDate || !leaveReason) {
      alert("Please fill both date and reason.");
      return;
    }
    alert("Leave request submitted!");
    setLeaveDate("");
    setLeaveReason("");
  };

  return (
    <div className="employee-dashboard">
      <h2 className="dashboard-title">Employee Self-Service Portal</h2>

      <div className="card-grid">
        {/* Profile Card */}
        <div className="card">
          <h3>My Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("loggedInUser");
            alert("Logged out successfully.");
            window.location.href = "/";
          }}>
            Logout
          </button>
        </div>
        
        {/* Payslip Card */}
        <div className="card">
          <h3>Payslip</h3>
          {payslip.map((p, idx) => (
            <div className="payslip-block" key={idx}>
              <div><strong>ID:</strong> {p.id}</div>
              <div><strong>Basic:</strong> ₹{p.basic}</div>
              <div><strong>Allowance:</strong> ₹{p.allowance}</div>
              <div><strong>Deductions:</strong> ₹{p.deductions}</div>
              <div><strong>Net Pay:</strong> ₹{p.netPay}</div>
              <div><strong>Status:</strong> <span className="status paid">{p.status}</span></div>
            </div>
          ))}
        </div>

        {/* Leave Application */}
        <div className="card">
          <h3>Leave Application</h3>
          <p><strong>Available Days:</strong> {availableLeaves}</p>

          <label>Date of Leave:</label>
          <input
            type="date"
            className="input"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
          />

          <label>Reason:</label>
          <textarea
            className="input"
            placeholder="Reason for leave..."
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
          />

          <button className="primary-btn" onClick={handleLeaveApply}>
            Apply for Leave
          </button>
        </div>

        {/* Attendance History */}
        <div className="card">
          <h3>Attendance History</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.date}</td>
                  <td>
                    <span className={`status ${entry.status.toLowerCase()}`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Training Progress */}
        <div className="card">
          <h3>Training Progress</h3>
          <ul>
            {training.map((t, idx) => (
              <li key={idx}>
                {t.module} —{" "}
                <span
                  className={`status ${
                    t.status === "Completed" ? "completed" : "inprogress"
                  }`}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Employee;
