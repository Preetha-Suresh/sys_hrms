import React, { useState, useEffect } from "react";
import "./pay.css";

const Pay = () => {
  const getCurrentMonth = () => new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const [payrollData, setPayrollData] = useState([
    { name: "John Smith", id: "EMP001", basic: 5000, allowance: 1000, deduction: 500, status: "Paid" },
    { name: "Sarah Johnson", id: "EMP002", basic: 4500, allowance: 800, deduction: 450, status: "Pending" },
    { name: "Mike Davis", id: "EMP003", basic: 4000, allowance: 600, deduction: 400, status: "Paid" },
    { name: "Emily Wilson", id: "EMP004", basic: 3800, allowance: 700, deduction: 380, status: "Processing" },
  ]);

  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-cell")) {
        setActionMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNetPay = (basic, allowance, deduction) => basic + allowance - deduction;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee payroll data?")) {
      setPayrollData(prev => prev.filter(emp => emp.id !== id));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPayrollData(prev =>
      prev.map(emp => emp.id === selectedEmployee.id ? selectedEmployee : emp)
    );
    setShowEditPopup(false);
  };

  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <h2>Payroll Management</h2>
        <p>Process employee salaries and view payroll status</p>
      </div>

      <div className="payroll-summary">
        <div className="summary-box blue"><h3>$18,670</h3><p>Total Payroll</p></div>
        <div className="summary-box green"><h3>2</h3><p>Paid Employees</p></div>
        <div className="summary-box yellow"><h3>1</h3><p>Pending Payments</p></div>
        <div className="summary-box sky"><h3>1</h3><p>Processing</p></div>
      </div>

      <div className="payroll-table-wrapper">
        <div className="payroll-table-header">
          <h4>Payroll Details</h4>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Basic</th>
              <th>Allowance</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((emp, idx) => (
              <tr key={idx}>
                <td><div className="avatar-text">{emp.name}</div></td>
                <td>{emp.id}</td>
                <td>${emp.basic}</td>
                <td>${emp.allowance}</td>
                <td>${emp.deduction}</td>
                <td><strong>${getNetPay(emp.basic, emp.allowance, emp.deduction)}</strong></td>
                <td>
                  <span className={`status-badge ${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="action-cell">
                  <i
                    className="bi bi-three-dots-vertical"
                    onClick={() =>
                      setActionMenuOpen(actionMenuOpen === emp.id ? null : emp.id)
                    }
                    style={{ cursor: "pointer" }}
                  ></i>
                  {actionMenuOpen === emp.id && (
                    <div className="action-dropdown">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowEditPopup(true);
                          setActionMenuOpen(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete"
                        onClick={() => {
                          handleDelete(emp.id);
                          setActionMenuOpen(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {showEditPopup && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Payroll - {selectedEmployee.name}</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                value={selectedEmployee.basic}
                type="number"
                placeholder="Basic"
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, basic: +e.target.value })}
              />
              <input
                value={selectedEmployee.allowance}
                type="number"
                placeholder="Allowance"
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, allowance: +e.target.value })}
              />
              <input
                value={selectedEmployee.deduction}
                type="number"
                placeholder="Deduction"
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, deduction: +e.target.value })}
              />
              <select
                value={selectedEmployee.status}
                onChange={(e) => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Processing</option>
              </select>
              <div className="form-actions">
                <button type="button" onClick={() => setShowEditPopup(false)}>Cancel</button>
                <button type="submit" className="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
