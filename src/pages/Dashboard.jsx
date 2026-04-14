import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Assignments from "../components/Assignments";
import Attendance from "../components/Attendance";
import Suggestions from "../components/Suggestions";
import LiveSession from "../components/LiveSession";
import "./Dashboard.css";

function Dashboard() {
  const [active, setActive] = useState("assignments");

  const renderContent = () => {
    switch (active) {
      case "assignments":
        return <Assignments />;
      case "attendance":
        return <Attendance />;
      case "suggestions":
        return <Suggestions />;
      case "live":
        return <LiveSession />;
      default:
        return <Assignments />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar active={active} setActive={setActive} />

      <div className="main-content">
        <h2>Teacher Dashboard</h2>

        <div className="card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;