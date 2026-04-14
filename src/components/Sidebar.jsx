function Sidebar({ active, setActive }) {
  return (
    <div style={styles.sidebar}>
      <h3>Teacher</h3>

      <button
        style={active === "assignments" ? styles.active : styles.btn}
        onClick={() => setActive("assignments")}
      >
        Assignments
      </button>

      <button
        style={active === "attendance" ? styles.active : styles.btn}
        onClick={() => setActive("attendance")}
      >
        Attendance Management
      </button>

      <button
        style={active === "suggestions" ? styles.active : styles.btn}
        onClick={() => setActive("suggestions")}
      >
        Suggestions
      </button>

      <button
        style={active === "live" ? styles.active : styles.btn}
        onClick={() => setActive("live")}
      >
        Live Attendance Session
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#f4f6f9",
    padding: "20px",
  },
  btn: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
  },
  active: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "none",
    background: "#1976d2",
    color: "white",
    borderRadius: "6px",
    textAlign: "left",
  },
};

export default Sidebar;