import { useState } from "react";
import "./AdminDashboard.css";
import Layout from "../../components/Layout";
import AddLeadModal from "../../components/AddLeadModal";

function AdminDashboard() {
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [dashboardLeads, setDashboardLeads] = useState([]);
  const baseNewLeads = 38;

  const handleSaveDashboardLead = (lead) => {
    setDashboardLeads((prev) => [lead, ...prev]);
  };

  const pipelineData = [
    {
      id: 1,
      letter: "V",
      colorClass: "dark",
      name: "Vortex Infrastructure",
      sub: "Enterprise Cloud Migration",
      amount: "$420,000",
      type: "6.3 Expansion",
      stage: "WON",
      stageClass: "won",
      percent: "100%",
      progressClass: "green",
      width: "100%",
    },
    {
      id: 2,
      letter: "L",
      colorClass: "blue",
      name: "Lumina Systems",
      sub: "Security Audit Suite",
      amount: "$185,500",
      type: "New Direct",
      stage: "ACTIVE",
      stageClass: "active",
      percent: "75%",
      progressClass: "blue",
      width: "75%",
    },
    {
      id: 3,
      letter: "A",
      colorClass: "yellow",
      name: "Apex Retail Group",
      sub: "POS Integration",
      amount: "$92,000",
      type: "Partnership",
      stage: "PENDING",
      stageClass: "pending",
      percent: "30%",
      progressClass: "yellow",
      width: "30%",
    },
    {
      id: 4,
      letter: "N",
      colorClass: "red",
      name: "Nebula Ventures",
      sub: "SaaS Compliance",
      amount: "$310,000",
      type: "Annual Renewal",
      stage: "LOST",
      stageClass: "lost",
      percent: "0%",
      progressClass: "red",
      width: "8%",
    },
  ];

  const pulseData = [
    {
      id: 1,
      dot: "blue-dot",
      text: 'Deal "Vortex Infrastructure" moved to WON',
      time: "2 MINUTES AGO • SARAH CHEN",
    },
    {
      id: 2,
      dot: "gray-dot",
      text: 'New lead "Starlight Tech" assigned to Pipeline',
      time: "1 HOUR AGO • SYSTEM AUTO",
    },
    {
      id: 3,
      dot: "yellow-dot",
      text: 'Follow-up task created for "Apex Retail"',
      time: "3 HOURS AGO • MARCUS REED",
    },
    {
      id: 4,
      dot: "gray-dot",
      text: "Quarterly report generated and mailed",
      time: "5 HOURS AGO • SYSTEM AUTO",
    },
  ];

  return (
    <Layout>
        <div className="page-content">
          <div className="page-heading">
            <h1>Executive Dashboard</h1>
            <p>System health: Nominal. Regional velocity up by 12.4%.</p>
            <button
              type="button"
              className="dashboard-add-lead-btn"
              onClick={() => setShowAddLeadModal(true)}
            >
              + Add Lead
            </button>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-head">
                <span>TOTAL REVENUE</span>
                <small className="green-text">+14%</small>
              </div>
              <h2>$2,482,900</h2>
              <div className="mini-line">
                <div className="mini-line-fill blue-fill"></div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span>ACTIVE DEALS</span>
                <small className="badge">Stable</small>
              </div>
              <h2>142</h2>
              <div className="bars-row">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span className="big-bar"></span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span>NEW LEADS</span>
                <small className="red-text">+4%</small>
              </div>
              <h2>{baseNewLeads + dashboardLeads.length}</h2>
              <p className="small-note">Comparison to target: 92%</p>
            </div>

            <div className="stat-card">
              <div className="stat-head">
                <span>WIN RATE</span>
                <small className="yellow-text">+2.3%</small>
              </div>
              <h2>64.8%</h2>
              <div className="mini-line">
                <div className="mini-line-fill yellow-fill"></div>
              </div>
            </div>
          </div>

          <div className="content-row">
            <div className="left-panel">
              <div className="pipeline-card">
                <div className="card-top">
                  <h3>Strategic Pipeline Velocity</h3>
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    VIEW ALL DEALS
                  </a>
                </div>

                <div className="pipeline-table-wrapper">
                  <div className="pipeline-table">
                    <div className="table-header">
                      <div className="col deal-col">DEAL NAME</div>
                      <div className="col amount-col">AMOUNT</div>
                      <div className="col stage-col">STAGE</div>
                      <div className="col prob-col">PROBABILITY</div>
                    </div>

                    {pipelineData.map((item) => (
                      <div className="table-row" key={item.id}>
                        <div className="col deal-col">
                          <div className="deal-box">
                            <div className={`deal-avatar ${item.colorClass}`}>
                              {item.letter}
                            </div>
                            <div>
                              <h4>{item.name}</h4>
                              <p>{item.sub}</p>
                            </div>
                          </div>
                        </div>

                        <div className="col amount-col">
                          <div className="amount-box">
                            <h4>{item.amount}</h4>
                            <p>{item.type}</p>
                          </div>
                        </div>

                        <div className="col stage-col">
                          <span className={`stage-badge ${item.stageClass}`}>
                            {item.stage}
                          </span>
                        </div>

                        <div className="col prob-col">
                          <div className="progress-box">
                            <div className="progress-track">
                              <div
                                className={`progress-fill ${item.progressClass}`}
                                style={{ width: item.width }}
                              ></div>
                            </div>
                            <span>{item.percent}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="right-panel">
              <div className="pulse-card">
                <h3>REAL-TIME PULSE</h3>

                {pulseData.map((item) => (
                  <div className="pulse-item" key={item.id}>
                    <span className={`pulse-dot ${item.dot}`}></span>
                    <div>
                      <h4>{item.text}</h4>
                      <p>{item.time}</p>
                    </div>
                  </div>
                ))}

                <button className="expand-btn">EXPAND EVENT LOGS</button>
              </div>

              <div className="prospect-card">
                <div className="prospect-top">
                  <h5>TOP PROSPECT</h5>
                  <span>✦</span>
                </div>

                <div className="prospect-user">
                  <img
                    src="https:images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="prospect"
                  />
                  <div>
                    <h4>Elena Rodriguez</h4>
                    <p>VP, Horizon Media</p>
                  </div>
                </div>

                <div className="quote-box">
                  "Interested in scaling the enterprise license to 500 seats by
                  Q4. High engagement on technical docs."
                </div>

                <button className="contact-btn">QUICK CONTACT</button>
              </div>
            </div>

          </div >

        </div>
        <AddLeadModal
          isOpen={showAddLeadModal}
          onClose={() => setShowAddLeadModal(false)}
          onSave={handleSaveDashboardLead}
        />
    </Layout>
  );
}

export default AdminDashboard;