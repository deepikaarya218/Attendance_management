import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [feedback, setFeedback] = useState('');

  const assignments = [
    { title: "CI/CD Pipeline Setup", date: "15/01/2024", status: "Submitted" },
    { title: "Docker Containerization", date: "22/01/2024", status: "Pending" },
    { title: "Kubernetes Deployment", date: "05/02/2024", status: "Pending" },
    { title: "Infrastructure as Code", date: "08/01/2024", status: "Submitted" },
    { title: "Monitoring and Logging", date: "15/02/2024", status: "Pending" },
  ];

  const filteredAssignments = assignments.filter(item => 
    activeTab === 'All' || item.status === activeTab
  );

  const wordCount = feedback.trim() === '' ? 0 : feedback.trim().split(/\s+/).length;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        
        {/* Top Navbar */}
        <header className="main-nav">
          <h1 className="nav-title">My DevOps Status</h1>
          <button className="logout-icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </header>

        <p className="welcome-text-centered">Welcome back, <span className="user-link">Arjun Sharma</span></p>

        {/* Profile Section */}
        <section className="dashboard-card profile-section">
          <div className="user-avatar-lightblue">AS</div>
          <div className="user-info">
            <h2 className="user-name-title">Arjun Sharma</h2>
            <p className="user-detail-line">Enrollment: 2024001234</p>
            <p className="user-detail-line">Computer Science | Sem: 4</p>
            <div className="proxy-container">
              <input type="checkbox" id="proxy-flag" className="white-checkbox" />
              <label htmlFor="proxy-flag">Proxy Flag</label>
            </div>
          </div>
        </section>

        {/* Attendance Progress - Header is Left Aligned */}
        <section className="dashboard-card">
          <div className="card-header-split">
            <h3 className="card-heading">DevOps Attendance Progress</h3>
            <span className="percentage-text">88%</span>
          </div>
          <p className="stat-subtext">28 / 32 Classes</p>
          <div className="progress-container">
            <div className="progress-bar-fill" style={{ width: '88%' }}></div>
          </div>
          <p className="disclaimer-text">Includes previous records</p>
        </section>

        {/* Assignments Section - Heading Left Aligned */}
        <section className="dashboard-card">
          <h3 className="card-heading">DevOps Assignments</h3>
          <div className="filter-tabs">
            {['All', 'Submitted', 'Pending'].map((tab) => (
              <button 
                key={tab} 
                className={`tab-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="assignment-stack">
            {filteredAssignments.map((item, idx) => (
              <div key={idx} className="assignment-item-row">
                <div className="item-meta">
                  <p className="item-title">{item.title}</p>
                  <p className="item-deadline">Deadline: {item.date}</p>
                </div>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Marks Grid - Heading Left Aligned */}
        <div className="dashboard-card no-padding-card">
          <h3 className="card-heading top-padding">DevOps Marks</h3>
          <div className="marks-layout-grid">
            {[
              { label: "Mid Sem Marks", val: "12", total: "15" },
              { label: "Practical Marks", val: "13", total: "15" },
              { label: "End Sem Marks", val: "48", total: "60" },
              { label: "Internal Marks", val: "8", total: "10" }
            ].map((m, i) => (
              <div key={i} className="mark-box">
                <span className="mark-category">{m.label}</span>
                <p className="mark-display">{m.val} <span className="mark-total">/ {m.total}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="dashboard-card total-summary-box">
          <span className="mark-category">Total Marks</span>
          <p className="grand-total-display">81 <span className="mark-total">/ 100</span></p>
        </div>

        {/* Feedback Section - Heading Left Aligned */}
        <section className="dashboard-card feedback-card">
          <h3 className="card-heading">Feedback</h3>
          <textarea 
            className="feedback-textarea" 
            placeholder="Share your feedback (max 50 words)..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <div className="feedback-footer">
            <span className="word-counter">{wordCount} / 50 words</span>
            <button className="submit-btn-styled">Submit Feedback</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;