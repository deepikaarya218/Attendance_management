import React, { useEffect, useState } from "react";
import "./Attendance.css";
import { getStudents } from "../services/api";

const demoData = {
  IT1: [
    { id: 1, name: "Aarav Kumar", present: 18, total: 20 },
    { id: 2, name: "Priya Singh", present: 19, total: 20 }
  ],
  IT2: [
    { id: 3, name: "Rohan Patel", present: 15, total: 20 },
    { id: 4, name: "Neha Sharma", present: 20, total: 20 }
  ],
  AIML: [
    { id: 5, name: "Arjun AI", present: 17, total: 20 }
  ]
};

function AttendanceManagement() {
  const [batch, setBatch] = useState("IT1");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch students
  useEffect(() => {
    if (!batch) return;

    setLoading(true);

    getStudents(batch)
      .then((data) => {
        if (!data) throw new Error();
        setStudents(data);
      })
      .catch(() => {
        setStudents(demoData[batch] || []);
      })
      .finally(() => setLoading(false));
  }, [batch]);

  // 🔥 Handle past attendance update
  const handlePastUpdate = (id, value) => {
    if (!value || value <= 0) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              present: s.present + value,
              total: s.total + value
            }
          : s
      )
    );
  };

  // 🎨 Percentage color
  const getColorClass = (percent) => {
    if (percent >= 90) return "green";
    if (percent >= 75) return "blue";
    return "red";
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2>Attendance Management</h2>

        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          <option value="IT1">IT1</option>
          <option value="IT2">IT2</option>
          <option value="AIML">AI/ML</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Present</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Add Past</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="center">
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5" className="center">
                  No Data
                </td>
              </tr>
            ) : (
              students.map((s) => {
                const percent = s.total
                  ? Math.round((s.present / s.total) * 100)
                  : 0;

                return (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.present}</td>
                    <td>{s.total}</td>

                    <td>
                      <span className={`badge ${getColorClass(percent)}`}>
                        {percent}%
                      </span>
                    </td>

                    {/* 🔥 Past Attendance Input */}
                    <td>
                      <input
                        type="number"
                        placeholder="+"
                        className="small-input"
                        onChange={(e) => {
                          s.temp = Number(e.target.value);
                        }}
                      />

                      <button
                        className="mini-btn"
                        onClick={() => handlePastUpdate(s.id, s.temp)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceManagement;