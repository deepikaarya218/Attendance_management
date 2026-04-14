import React, { useEffect, useState } from "react";
import "./LiveSession.css";
import { getStudents } from "../services/api"; // 👈 API

// 🔥 Fallback Demo Data
const batchData = {
  IT1: [
    { id: 1, name: "Aman Verma", present: false, flagged: false },
    { id: 2, name: "Riya Singh", present: false, flagged: false }
  ],
  IT2: [
    { id: 1, name: "Kavya Singh", present: false, flagged: false },
    { id: 2, name: "Lakshya Gupta", present: false, flagged: false },
    { id: 3, name: "Meera Joshi", present: false, flagged: false },
    { id: 4, name: "Nikhil Deshmukh", present: false, flagged: false },
    { id: 5, name: "Omkar Rathod", present: false, flagged: false }
  ],
  AIML: [
    { id: 1, name: "Arjun AI", present: false, flagged: false },
    { id: 2, name: "Neha ML", present: false, flagged: false }
  ]
};

function LiveSession() {
  const [batch, setBatch] = useState("IT2");
  const [students, setStudents] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH STUDENTS (API + fallback)
  useEffect(() => {
    if (!batch) return;

    setLoading(true);

    getStudents(batch)
      .then((data) => {
        if (!data) throw new Error();
        setStudents(data);
      })
      .catch(() => {
        // fallback demo
        setStudents(batchData[batch] || []);
      })
      .finally(() => setLoading(false));
  }, [batch]);

  // ⏱ Timer
  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const total = students.length;
  const present = students.filter((s) => s.present).length;
  const absent = total - present;
  const progress = total ? (present / total) * 100 : 0;

  // 🚩 Flag toggle (frontend only for now)
  const toggleFlag = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, flagged: !s.flagged } : s
      )
    );
  };

  const startAttendance = () => {
    setIsStarted(true);
    setTimeLeft(300);
  };

  const endAttendance = () => setIsStarted(false);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="container">
      <h2>Attendance Session</h2>

      {/* Top Section */}
      <div className="top">
        <div className="card">
          <p className="label">SELECT BATCH</p>
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            <option value="IT1">IT1</option>
            <option value="IT2">IT2</option>
            <option value="AIML">AI/ML</option>
          </select>
        </div>

        <div className="card control">
          <p className="label">SESSION CONTROL</p>
          <div className="info-box">
            {isStarted
              ? "Attendance in progress..."
              : "Ready to start attendance"}
          </div>

          <div className="buttons">
            <button className="start" onClick={startAttendance}>
              ▶ Start
            </button>
            <button className="end" onClick={endAttendance}>
              ■ End
            </button>
          </div>

          <p className="timer">
            {isStarted ? formatTime() : "Not Started"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat">
          <p>Total Students</p>
          <h2>{total}</h2>
        </div>
        <div className="stat">
          <p>Present</p>
          <h2>{present}</h2>
        </div>
        <div className="stat">
          <p>Absent</p>
          <h2>{absent}</h2>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-card">
        <div className="progress-header">
          <span>Attendance Progress</span>
          <span>{present}/{total}</span>
        </div>

        <div className="progress-bar">
          <div
            className="fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <h3>Students ({total})</h3>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Flag</th>
            </tr>
          </thead>

          <tbody>
            {!batch ? (
              <tr>
                <td colSpan="4" className="center">
                  Select Batch
                </td>
              </tr>
            ) : loading ? (
              <tr>
                <td colSpan="4" className="center">
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="4" className="center">
                  No Students
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>

                  <td>
                    {s.present ? (
                      <span className="badge present">✔ Present</span>
                    ) : (
                      <span className="badge not">⏱ Not Marked</span>
                    )}
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={s.flagged}
                      onChange={() => toggleFlag(s.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LiveSession;