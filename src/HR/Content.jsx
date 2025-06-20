import React, { useState, useEffect, useRef } from 'react';
import './Content.css';

const Content = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const loggedInUser = {
    name: "Admin Name",
    email: "admin@company.com",
    role: "HR Manager",
    status: "Active",
    avatar: ""
  };

  const [employees, setEmployees] = useState([
    {
      id: "E001",
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+1 234 567 8901",
      department: "Sales",
      role: "Manager",
      status: "Active",
      avatar: ""
    },
    {
      id: "E002",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      phone: "+1 234 567 8902",
      department: "Development",
      role: "Senior Developer",
      status: "Active",
      avatar: ""
    },
    {
      id: "E003",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      phone: "+1 234 567 8903",
      department: "Marketing",
      role: "Marketing Specialist",
      status: "Active",
      avatar: ""
    },
    {
      id: "E004",
      name: "Emma Thompson",
      email: "emma.thompson@company.com",
      phone: "+1 234 567 8904",
      department: "Human Resources",
      role: "HR Coordinator",
      status: "On Leave",
      avatar: ""
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    id: "", name: "", email: "", phone: "", department: "", role: "", status: "Active", avatar: ""
  });

  const filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    const departmentMatch = !departmentFilter || emp.department === departmentFilter;
    const keywordMatch =
      emp.name.toLowerCase().includes(query) ||
      emp.status.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.id.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query);
    return departmentMatch && keywordMatch;
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees(prev => [...prev, newEmployee]);
    setNewEmployee({ id: "", name: "", email: "", phone: "", department: "", role: "", status: "Active", avatar: "" });
    setShowPopup(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setShowEditPopup(true);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => emp.id === editEmployee.id ? editEmployee : emp));
    setShowEditPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="content">
      <div className="content-header d-flex justify-content-between align-items-center">
        <div className="welcome-section">
          <h3>Welcome, {loggedInUser.name}</h3>
          <p className="text-muted">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="icon-section d-flex align-items-center gap-4">
          <div className="profile-icon" onClick={() => setShowProfilePopup(true)}>
            <i className="bi bi-person"></i>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Dashboard Overview</h2>
          <p className="subtitle">Monitor and manage your workforce effectively</p>
        </div>

        <div className="stats-cards">
          <div className="card">
            <p className="card-title">Total Employees</p>
            <div className="card-body">
              <h3>{employees.length}</h3>
              <div className="card-icon bg-blue"><i className="bi bi-people"></i></div>
            </div>
          </div>

          <div className="card">
            <p className="card-title">Total Departments</p>
            <div className="card-body">
              <h3>5</h3>
              <div className="card-icon bg-green"><i className="bi bi-building"></i></div>
            </div>
          </div>

          <div className="card time-card">
            <p className="card-title">Today</p>
            <div className="card-body">
              <h4>{new Date().toLocaleDateString()}</h4>
              <p>{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name, ID, email, role, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="">All Departments</option>
            <option>Human Resources</option>
            <option>Development</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
          <button className="add-btn" onClick={() => setShowPopup(true)}>
            <i className="bi bi-person-plus"></i> Add Employee
          </button>
        </div>
      </div>

      <div className="employee-directory">
        <h3>Employee Directory</h3>
        <p className="text-muted">{filteredEmployees.length} employees found</p>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-info">
                      <img src={emp.avatar || "https://via.placeholder.com/50"} alt={emp.name} className="emp-avatar" />
                      <div>
                        <strong>{emp.name}</strong>
                        <div className="text-muted">{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{emp.email}</div>
                    <div className="text-muted">{emp.phone}</div>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                  <td>
                    <span className={`status ${emp.status === "Active" ? "active" : "on-leave"}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="position-relative" ref={menuRef}>
                    <i
                      className="bi bi-three-dots-vertical"
                      onClick={() =>
                        setActiveMenu((prev) => (prev === emp.id ? null : emp.id))
                      }
                      style={{ cursor: 'pointer' }}
                    ></i>
                    {activeMenu === emp.id && (
                      <div className="action-dropdown">
                        <button onClick={() => { handleEdit(emp); setActiveMenu(null); }}>Edit</button>
                        <button className="delete" onClick={() => { handleDelete(emp.id); setActiveMenu(null); }}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No results match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Employee</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            </div>
            <form onSubmit={handleAddEmployee} className="modal-body">
              <div className="form-group">
                <input type="text" placeholder="Full Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                <input type="text" placeholder="e.g., E005" value={newEmployee.id} onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Phone" value={newEmployee.phone} onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} />
                <input type="email" placeholder="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
              </div>
              <div className="form-group">
                <select value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}>
                  <option>Select Department</option>
                  <option>Development</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                </select>
                <input type="text" placeholder="Role" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} />
              </div>
              <div className="form-group">
                <select value={newEmployee.status} onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}>
                  <option>Active</option>
                  <option>On Leave</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
                <button type="submit" className="add-btn">Add Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditPopup && editEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Employee</h2>
              <button className="close-btn" onClick={() => setShowEditPopup(false)}>×</button>
            </div>
            <form onSubmit={handleUpdateEmployee} className="modal-body">
              <div className="form-group">
                <input type="text" value={editEmployee.name} onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })} />
                <input type="text" value={editEmployee.id} disabled />
              </div>
              <div className="form-group">
                <input type="text" value={editEmployee.phone} onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })} />
                <input type="email" value={editEmployee.email} onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })} />
              </div>
              <div className="form-group">
                <select value={editEmployee.department} onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })}>
                  <option>Development</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                </select>
                <input type="text" value={editEmployee.role} onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })} />
              </div>
              <div className="form-group">
                <select value={editEmployee.status} onChange={(e) => setEditEmployee({ ...editEmployee, status: e.target.value })}>
                  <option>Active</option>
                  <option>On Leave</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel" onClick={() => setShowEditPopup(false)}>Cancel</button>
                <button type="submit" className="add-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My Profile Popup */}
      {showProfilePopup && (
        <div className="modal-overlay">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h2>My Profile</h2>
              <button className="close-btn" onClick={() => setShowProfilePopup(false)}>×</button>
            </div>
            <div className="modal-body">
              <img
                src={loggedInUser.avatar || "https://via.placeholder.com/100"}
                alt="User Avatar"
                style={{ borderRadius: '50%', width: '100px', marginBottom: '15px' }}
              />
              <h4>{loggedInUser.name}</h4>
              <p>Email: {loggedInUser.email}</p>
              <p>Role: {loggedInUser.role}</p>
              <p>Status: {loggedInUser.status}</p>
              <button className="add-btn" onClick={() => alert('Logging out...')}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
