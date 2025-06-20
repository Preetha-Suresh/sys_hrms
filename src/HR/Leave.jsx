import React, { useState } from "react";
import "./Leave.css";

const Leave = () => {
  const getCurrentDate = () => new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [attendanceData, setAttendanceData] = useState([
    {
      name: "John Smith",
      date: getCurrentDate(),
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
    },
    {
      name: "Sarah Johnson",
      date: getCurrentDate(),
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      status: "Present",
    },
    {
      name: "Mike Davis",
      date: getCurrentDate(),
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
    },
    {
      name: "Emily Wilson",
      date: getCurrentDate(),
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      status: "Present",
    },
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { name: "Mike Davis", date: getCurrentDate() },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const handleDecision = (name, decision) => {
    setAttendanceData((prev) =>
      prev.map((emp) =>
        emp.name === name
          ? {
              ...emp,
              status: decision === "approve" ? "Present" : "Absent",
              checkIn: decision === "approve" ? "09:00 AM" : "-",
              checkOut: decision === "approve" ? "06:00 PM" : "-",
            }
          : emp
      )
    );
    setLeaveRequests((prev) => prev.filter((req) => req.name !== name));
  };

  return (
    <div className="leave-container">
      <div className="leave-header">
        <h2>Leave & Attendance</h2>
        <p>Track employee attendance and manage leave requests</p>
      </div>

      <div className="leave-tabs">
        <button className="active-tab">Attendance</button>
        <button onClick={() => setShowPopup(true)}>Leave Requests</button>
      </div>

      <div className="attendance-section">
        <div className="attendance-title">
          <h3>Daily Attendance - Today</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData
              .filter((emp) => emp.date === selectedDate)
              .map((emp, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="avatar-text">
                      <div className="avatar"></div> {emp.name}
                    </div>
                  </td>
                  <td>{emp.date}</td>
                  <td>{emp.checkIn}</td>
                  <td>{emp.checkOut}</td>
                  <td>
                    <span className={`status-badge ${emp.status.toLowerCase()}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Leave Request Popup */}
      {showPopup && (
        <div className="leave-popup">
          <div className="popup-content">
            <h3>Leave Requests</h3>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((req, idx) => (
                <div key={idx} className="request-row">
                  <p>{req.name} - {req.date}</p>
                  <div className="btns">
                    <button onClick={() => handleDecision(req.name, "approve")}>
                      Approve
                    </button>
                    <button onClick={() => handleDecision(req.name, "deny")}>
                      Deny
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending requests.</p>
            )}
            <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
