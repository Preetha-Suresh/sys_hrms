import React, { useState, useEffect } from "react";
import "./Recruitment.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Recruitment = () => {
  const [jobPositions, setJobPositions] = useState([
    {
      id: 1,
      position: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      posted: "2024-01-10",
      status: "Active",
      candidates: [{ name: "Alice", contact: "alice@example.com" }],
    },
    {
      id: 2,
      position: "Marketing Manager",
      department: "Marketing",
      location: "New York",
      type: "Full-time",
      posted: "2024-01-08",
      status: "Active",
      candidates: [{ name: "Bob", contact: "bob@example.com" }],
    },
    {
      id: 3,
      position: "Sales Manager",
      department: "Sales",
      location: "Chicago",
      type: "Full-time",
      posted: "2024-01-05",
      status: "Closed",
      candidates: [{ name: "Charlie", contact: "charlie@example.com" }],
    },
  ]);

  const COLORS = ["#4f46e5", "#22c55e", "#facc15"];
  const chartData = jobPositions.map((job) => ({
    name: job.position,
    value: job.candidates.length,
  }));

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCandidatesPopup, setShowCandidatesPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newCandidate, setNewCandidate] = useState({ name: "", contact: "" });
  const [newJob, setNewJob] = useState({
    position: "",
    department: "",
    location: "",
    type: "Full-time",
    posted: new Date().toISOString().slice(0, 10),
    status: "Active",
    candidates: [],
  });
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const handleAddJob = (e) => {
    e.preventDefault();
    const id = Date.now();
    setJobPositions([...jobPositions, { ...newJob, id }]);
    setNewJob({
      position: "",
      department: "",
      location: "",
      type: "Full-time",
      posted: new Date().toISOString().slice(0, 10),
      status: "Active",
      candidates: [],
    });
    setShowAddPopup(false);
  };

  const handleEditJob = (e) => {
    e.preventDefault();
    setJobPositions((prev) =>
      prev.map((job) => (job.id === selectedJob.id ? selectedJob : job))
    );
    setShowEditPopup(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job position?")) {
      setJobPositions((prev) => prev.filter((job) => job.id !== id));
    }
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    const updated = jobPositions.map((job) =>
      job.id === selectedJob.id
        ? { ...job, candidates: [...job.candidates, newCandidate] }
        : job
    );
    setJobPositions(updated);
    setNewCandidate({ name: "", contact: "" });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-cell")) setActionMenuOpen(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="recruitment-container">
      <div className="recruitment-header">
        <div>
          <h2>Recruitment & Onboarding</h2>
          <p>Manage job postings, candidates, and hiring process</p>
        </div>
        <button className="btn-filled" onClick={() => setShowAddPopup(true)}>
          + Add Job Position
        </button>
      </div>

      <div className="recruitment-visual">
        <div className="chart-card">
          <PieChart width={300} height={250}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="job-section">
        <h3>Open Job Positions</h3>
        <table className="job-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Department</th>
              <th>Location</th>
              <th>Type</th>
              <th>Posted</th>
              <th>Applications</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPositions.map((job) => (
              <tr key={job.id}>
                <td>{job.position}</td>
                <td>{job.department}</td>
                <td>{job.location}</td>
                <td>{job.type}</td>
                <td>{job.posted}</td>
                <td>{job.candidates.length}</td>
                <td>
                  <span className={`status ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
                <td className="action-cell">
                  <i
                    className="bi bi-three-dots-vertical"
                    onClick={() =>
                      setActionMenuOpen(actionMenuOpen === job.id ? null : job.id)
                    }
                  ></i>
                  {actionMenuOpen === job.id && (
                    <div className="action-dropdown">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowEditPopup(true);
                          setActionMenuOpen(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          handleDelete(job.id);
                          setActionMenuOpen(null);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowCandidatesPopup(true);
                          setActionMenuOpen(null);
                        }}
                      >
                        View Candidates
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Job Popup */}
      {showAddPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Job Position</h2>
            <form onSubmit={handleAddJob}>
              <input placeholder="Position" value={newJob.position} onChange={(e) => setNewJob({ ...newJob, position: e.target.value })} required />
              <input placeholder="Department" value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })} required />
              <input placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} required />
              <select value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}>
                <option>Full-time</option>
                <option>Part-time</option>
              </select>
              <select value={newJob.status} onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}>
                <option>Active</option>
                <option>Closed</option>
              </select>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddPopup(false)}>Cancel</button>
                <button type="submit" className="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Popup */}
      {showEditPopup && selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Job</h2>
            <form onSubmit={handleEditJob}>
              <input value={selectedJob.position} onChange={(e) => setSelectedJob({ ...selectedJob, position: e.target.value })} />
              <input value={selectedJob.department} onChange={(e) => setSelectedJob({ ...selectedJob, department: e.target.value })} />
              <input value={selectedJob.location} onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })} />
              <select value={selectedJob.type} onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value })}>
                <option>Full-time</option>
                <option>Part-time</option>
              </select>
              <select value={selectedJob.status} onChange={(e) => setSelectedJob({ ...selectedJob, status: e.target.value })}>
                <option>Active</option>
                <option>Closed</option>
              </select>
              <div className="form-actions">
                <button type="button" onClick={() => setShowEditPopup(false)}>Cancel</button>
                <button type="submit" className="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidates Popup */}
      {showCandidatesPopup && selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Candidates for {selectedJob.position}</h2>
            <ul>
              {selectedJob.candidates.map((c, i) => (
                <li key={i}><strong>{c.name}</strong> - {c.contact}</li>
              ))}
            </ul>
            <form onSubmit={handleAddCandidate}>
              <input
                placeholder="Candidate Name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                required
              />
              <input
                placeholder="Contact"
                value={newCandidate.contact}
                onChange={(e) => setNewCandidate({ ...newCandidate, contact: e.target.value })}
                required
              />
              <div className="form-actions">
                <button type="button" onClick={() => setShowCandidatesPopup(false)}>Close</button>
                <button type="submit" className="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruitment;
