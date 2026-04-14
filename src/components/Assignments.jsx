import { useState, useEffect } from "react";
import "./Assignments.css";
import { getStudents, uploadAssignment, viewSubmission } from "../services/api";

function Assignments() {
  const [batch, setBatch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [assignment, setAssignment] = useState({
    title: "",
    file: null,
  });

  // 🔥 DEMO DATA
  const demoData = {
    IT1: [
      { id: 1, name: "Aarav Kumar", submitted: true, date: "2024-01-15" },
      { id: 2, name: "Priya Singh", submitted: false, date: "" },
    ],
    IT2: [
      { id: 3, name: "Rohan Patel", submitted: true, date: "2024-01-16" },
    ],
    AI: [
      { id: 4, name: "Neha Sharma", submitted: false, date: "" },
    ],
  };

  // 🔥 Fetch students (API + fallback)
  useEffect(() => {
    if (!batch) return;

    setLoading(true);

    getStudents(batch)
      .then((data) => {
        if (!data || data.length === 0) throw new Error();
        setStudents(data);
      })
      .catch(() => {
        // 👉 fallback demo data
        setStudents(demoData[batch] || []);
      })
      .finally(() => setLoading(false));
  }, [batch]);

  // Upload Assignment
  const handleUpload = async () => {
    if (!batch) return alert("Select batch");
    if (!assignment.title) return alert("Enter title");
    if (!assignment.file) return alert("Select file");

    const formData = new FormData();
    formData.append("title", assignment.title);
    formData.append("file", assignment.file);
    formData.append("batch", batch);

    try {
      await uploadAssignment(formData);
      alert("Assignment uploaded");
    } catch {
      alert("Demo mode: Uploaded (not saved)");
    }
  };

  return (
    <div className="assignment-container">

      {/* Top */}
      <div className="top-bar">
        <h2>Assignments</h2>

        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          <option value="IT1">IT1</option>
          <option value="IT2">IT2</option>
          <option value="AI">AI/ML</option>
        </select>
      </div>

      {/* Upload */}
      <div className="upload-section">
        <input
          type="text"
          placeholder="Assignment Title"
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setAssignment({ ...assignment, file: e.target.files[0] })
          }
        />

        <button onClick={handleUpload} disabled={!batch}>
          Upload Assignment
        </button>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
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
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>

                  <td>
                    <span
                      className={
                        s.submitted ? "status submitted" : "status pending"
                      }
                    >
                      {s.submitted ? "✔ Submitted" : "✖ Pending"}
                    </span>
                  </td>

                  <td>{s.date || "—"}</td>

                  <td>
                    {s.submitted ? (
                      <button
                        onClick={() => viewSubmission(s.id)}
                        className="view-btn"
                      >
                        👁 View
                      </button>
                    ) : (
                      <span className="pending-text">Pending</span>
                    )}
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

export default Assignments;