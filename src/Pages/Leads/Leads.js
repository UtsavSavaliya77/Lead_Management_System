import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import AddLeadModal from "../../components/AddLeadModal";
import { toast } from "react-toastify";
import "./Leads.css";

const INITIAL_LEADS = [
  {
    id: 1,
    name: "Julianne Moore",
    company: "Starlight Ventures",
    contact: "j.moore@starlight.co",
    phone: "+1 555-012-3456",
    source: "LinkedIn",
    status: "New",
    priority: "High",
    assignedTo: "Sarah J.",
    followUp: "Oct 24, 2023",
    city: "San Francisco",
    businessType: "SaaS",
    budgetRange: "$10,000 - $50,000",
    serviceInterest: ["Digital Strategy", "Cloud Migration"],
    tags: ["Q4", "SOC2"],
    notes: [
      "Spoke with Julianne today about the Q4 enterprise migration.",
      "Requested detailed whitepaper on SOC2 compliance.",
    ],
  },
  {
    id: 2,
    name: "Marcus Thorne",
    company: "Apex Global Solutions",
    contact: "m.thorne@apex.com",
    phone: "+1 555-987-6543",
    source: "Web",
    status: "Contacted",
    priority: "Medium",
    assignedTo: "David K.",
    followUp: "Nov 05, 2023",
    city: "Austin",
    businessType: "IT Services",
    budgetRange: "$25,000 - $80,000",
    serviceInterest: ["Security Audit"],
    tags: ["Mid-Market"],
    notes: ["Needs proposal before Friday."],
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "Nexus Logistics",
    contact: "elena.r@nexus.io",
    phone: "+1 555-246-8101",
    source: "Referral",
    status: "Qualified",
    priority: "Low",
    assignedTo: "Sarah J.",
    followUp: "Nov 02, 2023",
    city: "Seattle",
    businessType: "Logistics",
    budgetRange: "$15,000 - $40,000",
    serviceInterest: ["Automation"],
    tags: ["Ops"],
    notes: ["Interested in onboarding automation module."],
  },
  {
    id: 4,
    name: "Thomas Wright",
    company: "Wright & Co.",
    contact: "t.wright@wright.com",
    phone: "+1 555-444-3322",
    source: "Ads",
    status: "Disqualified",
    priority: "Low",
    assignedTo: "Unassigned",
    followUp: "--",
    city: "Chicago",
    businessType: "Consulting",
    budgetRange: "$5,000 - $15,000",
    serviceInterest: ["Digital Strategy"],
    tags: ["Cold"],
    notes: ["Budget misalignment for now."],
  },
  {
    id: 5,
    name: "Julianne Moore",
    company: "Starlight Ventures",
    contact: "j.moore@starlight.co",
    phone: "+1 555-012-3456",
    source: "LinkedIn",
    status: "New",
    priority: "High",
    assignedTo: "Sarah J.",
    followUp: "Oct 24, 2023",
    city: "San Francisco",
    businessType: "SaaS",
    budgetRange: "$10,000 - $50,000",
    serviceInterest: ["Digital Strategy", "Cloud Migration"],
    tags: ["Q4", "SOC2"],
    notes: [
      "Spoke with Julianne today about the Q4 enterprise migration.",
      "Requested detailed whitepaper on SOC2 compliance.",
    ],
  },
  {
    id: 6,
    name: "Marcus Thorne",
    company: "Apex Global Solutions",
    contact: "m.thorne@apex.com",
    phone: "+1 555-987-6543",
    source: "Web",
    status: "Contacted",
    priority: "Medium",
    assignedTo: "David K.",
    followUp: "Nov 05, 2023",
    city: "Austin",
    businessType: "IT Services",
    budgetRange: "$25,000 - $80,000",
    serviceInterest: ["Security Audit"],
    tags: ["Mid-Market"],
    notes: ["Needs proposal before Friday."],
  },
  {
    id: 7,
    name: "Elena Rodriguez",
    company: "Nexus Logistics",
    contact: "elena.r@nexus.io",
    phone: "+1 555-246-8101",
    source: "Referral",
    status: "Qualified",
    priority: "Low",
    assignedTo: "Sarah J.",
    followUp: "Nov 02, 2023",
    city: "Seattle",
    businessType: "Logistics",
    budgetRange: "$15,000 - $40,000",
    serviceInterest: ["Automation"],
    tags: ["Ops"],
    notes: ["Interested in onboarding automation module."],
  },
  {
    id: 8,
    name: "Thomas Wright",
    company: "Wright & Co.",
    contact: "t.wright@wright.com",
    phone: "+1 555-444-3322",
    source: "Ads",
    status: "Disqualified",
    priority: "Low",
    assignedTo: "Unassigned",
    followUp: "--",
    city: "Chicago",
    businessType: "Consulting",
    budgetRange: "$5,000 - $15,000",
    serviceInterest: ["Digital Strategy"],
    tags: ["Cold"],
    notes: ["Budget misalignment for now."],
  },
  {
    id: 9,
    name: "Julianne Moore",
    company: "Starlight Ventures",
    contact: "j.moore@starlight.co",
    phone: "+1 555-012-3456",
    source: "LinkedIn",
    status: "New",
    priority: "High",
    assignedTo: "Sarah J.",
    followUp: "Oct 24, 2023",
    city: "San Francisco",
    businessType: "SaaS",
    budgetRange: "$10,000 - $50,000",
    serviceInterest: ["Digital Strategy", "Cloud Migration"],
    tags: ["Q4", "SOC2"],
    notes: [
      "Spoke with Julianne today about the Q4 enterprise migration.",
      "Requested detailed whitepaper on SOC2 compliance.",
    ],
  },
  {
    id: 10,
    name: "Marcus Thorne",
    company: "Apex Global Solutions",
    contact: "m.thorne@apex.com",
    phone: "+1 555-987-6543",
    source: "Web",
    status: "Contacted",
    priority: "Medium",
    assignedTo: "David K.",
    followUp: "Nov 05, 2023",
    city: "Austin",
    businessType: "IT Services",
    budgetRange: "$25,000 - $80,000",
    serviceInterest: ["Security Audit"],
    tags: ["Mid-Market"],
    notes: ["Needs proposal before Friday."],
  },
  {
    id: 11,
    name: "Elena Rodriguez",
    company: "Nexus Logistics",
    contact: "elena.r@nexus.io",
    phone: "+1 555-246-8101",
    source: "Referral",
    status: "Qualified",
    priority: "Low",
    assignedTo: "Sarah J.",
    followUp: "Nov 02, 2023",
    city: "Seattle",
    businessType: "Logistics",
    budgetRange: "$15,000 - $40,000",
    serviceInterest: ["Automation"],
    tags: ["Ops"],
    notes: ["Interested in onboarding automation module."],
  },
  {
    id: 12,
    name: "Thomas Wright",
    company: "Wright & Co.",
    contact: "t.wright@wright.com",
    phone: "+1 555-444-3322",
    source: "Ads",
    status: "Disqualified",
    priority: "Low",
    assignedTo: "Unassigned",
    followUp: "--",
    city: "Chicago",
    businessType: "Consulting",
    budgetRange: "$5,000 - $15,000",
    serviceInterest: ["Digital Strategy"],
    tags: ["Cold"],
    notes: ["Budget misalignment for now."],
  },
  
];

function Leads() {
  const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Disqualified"];
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const rowsPerPage=5;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [scheduleState, setScheduleState] = useState({
    isOpen: false,
    date: "",
    time: "10:00",
  });
  

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const sourceMatch = sourceFilter === "All" || lead.source === sourceFilter;
      const statusMatch = statusFilter === "All" || lead.status === statusFilter;
      return sourceMatch && statusMatch;
    });
  }, [leads, sourceFilter, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredLeads.length / rowsPerPage));
  const safePage = Math.min(currentPage, pageCount);
  const pageStart = (safePage - 1) * rowsPerPage;
  const pageLeads = filteredLeads.slice(pageStart, pageStart + rowsPerPage);
  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) || null;

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (nextPage) => {
    if (nextPage >= 1 && nextPage <= pageCount) {
      setCurrentPage(nextPage);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "--";
  
    const date = new Date(dateValue);
  
    return date.toLocaleDateString("en-US", {
      month: "short",   // Oct
      day: "2-digit",   // 24
      year: "numeric"   // 2023
    });
  };

  const formatFollowUp = (dateValue, timeValue) => {
    if (!dateValue || dateValue === "--") return "--";
    const formattedDate = formatDate(dateValue);
    if (!timeValue) return formattedDate;
    return `${formattedDate}, ${timeValue}`;
  };

  // const handleRowsPerPageChange = (event) => {
  //   setRowsPerPage(Number(event.target.value));
  //   setCurrentPage(1);
  // };

  const handleSaveLead = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
    setShowAddModal(false);
    setCurrentPage(1);
    toast.success("Lead added successfully.");
  };

  const handleExportLeads = () => {
    if (!filteredLeads.length) {
      toast.error("No leads available to export.");
      return;
    }

    const headers = [
      "Lead Name",
      "Company",
      "Email",
      "Phone",
      "Source",
      "Status",
      "Priority",
      "Assigned To",
      "Follow Up",
      "City",
      "Business Type",
      "Budget Range",
      "Service Interest",
      "Tags",
      "Notes",
    ];

    const escapeCsv = (value) => {
      const normalized =
        value === null || value === undefined ? "" : String(value);
      return `"${normalized.replace(/"/g, '""')}"`;
    };

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.company,
      lead.contact,
      lead.phone,
      lead.source,
      lead.status,
      lead.priority,
      lead.assignedTo,
      lead.followUp,
      lead.city,
      lead.businessType,
      lead.budgetRange,
      (lead.serviceInterest || []).join(" | "),
      (lead.tags || []).join(" | "),
      (lead.notes || []).join(" | "),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.setAttribute("download", `leads-export-${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Leads exported successfully.");
  };

  useEffect(() => {
    setNoteDraft("");
  }, [selectedLeadId]);

  const updateSelectedLead = (updater) => {
    if (!selectedLeadId) return;

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== selectedLeadId) return lead;
        return updater(lead);
      })
    );
  };

  const handleAddNote = () => {
    const cleanNote = noteDraft.trim();
    if (!cleanNote) {
      toast.error("Please enter a note.");
      return;
    }

    updateSelectedLead((lead) => ({
      ...lead,
      notes: [...lead.notes, cleanNote],
    }));
    setNoteDraft("");
    toast.success("Note added successfully.");
  };

  const handleSchedule = () => {
    if (!selectedLead) return;
    setScheduleState({
      isOpen: true,
      date:
        selectedLead.followUp && selectedLead.followUp !== "--"
          ? selectedLead.followUp
          : "",
      time: selectedLead.followUpTime || "10:00",
    });
  };

  const closeScheduleModal = () => {
    setScheduleState({
      isOpen: false,
      date: "",
      time: "10:00",
    });
  };

  const submitSchedule = () => {
    if (!selectedLead) return;
    if (!scheduleState.date || !scheduleState.time) {
      toast.error("Please select both date and time.");
      return;
    }

    updateSelectedLead((lead) => ({
      ...lead,
      followUp: scheduleState.date,
      followUpTime: scheduleState.time,
    }));
    closeScheduleModal();
    toast.success("Follow-up date and time updated successfully.");
  };

  const handleStatusChange = () => {
    if (!selectedLead) return;
    const newStatus = window.prompt(
      `Enter status (${LEAD_STATUSES.join(", ")}):`,
      selectedLead.status
    );

    if (newStatus === null) return;
    const normalizedStatus = newStatus.trim();
    if (!normalizedStatus) return;

    const matchedStatus = LEAD_STATUSES.find(
      (status) => status.toLowerCase() === normalizedStatus.toLowerCase()
    );

    if (!matchedStatus) {
      toast.error(`Invalid status. Use one of: ${LEAD_STATUSES.join(", ")}`);
      return;
    }

    updateSelectedLead((lead) => ({
      ...lead,
      status: matchedStatus,
    }));
  };

  return (
    <Layout>
      <div className="leads-page">
        <div className={`leads-main ${selectedLead ? "blurred" : ""}`}>
          <div className="leads-header">
            <div>
              <h1>Leads</h1>
              <p>{filteredLeads.length} total leads in your pipeline</p>
            </div>
            <div className="header-actions">
              <button className="export-btn" onClick={handleExportLeads}>Export</button>
              <button className="add-lead-btn" onClick={() => setShowAddModal(true)}>
                + Add Lead
              </button>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Source</label>
              <select value={sourceFilter} onChange={handleFilterChange(setSourceFilter)}>
                <option>All</option>
                <option>LinkedIn</option>
                <option>Web</option>
                <option>Referral</option>
                <option>Ads</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select value={statusFilter} onChange={handleFilterChange(setStatusFilter)}>
                <option>All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Disqualified</option>
              </select>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Contact</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {pageLeads.map((lead) => (
                  <tr key={lead.id} className={selectedLead?.id === lead.id ? "active-row" : ""} onClick={() => setSelectedLeadId(lead.id)}>
                    <td>
                      <strong>{lead.name}</strong>
                      <span>{lead.company}</span>
                    </td>
                    <td>
                      {lead.contact}
                      <span>{lead.phone}</span>
                    </td>
                    <td>{lead.source}</td>
                    <td>{lead.status}</td>
                    <td className={`priority-${lead.priority.toLowerCase()}`}>{lead.priority}</td>
                    <td>{lead.assignedTo}</td>
                    <td>{formatFollowUp(lead.followUp, lead.followUpTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div>
              <button onClick={() => handlePageChange(safePage - 1)} disabled={safePage === 1}>
                Prev
              </button>
              <span>
                Page {safePage} of {pageCount}
              </span>
              <button onClick={() => handlePageChange(safePage + 1)} disabled={safePage === pageCount}>
                Next
              </button>
            </div>
            {/* <div className="rows-control">
              <label htmlFor="rows-per-page">Rows per page:</label>
              <select id="rows-per-page" value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div> */}
          </div>

          <div className="lead-metrics">
            <div className="metric-card velocity-card">
              <p className="metric-label">Conversion Velocity</p>
              <h3>2.4 days</h3>
              <p className="metric-change">12% improvement this week</p>
            </div>

            <div className="metric-card deals-card">
              <p className="metric-label">Active Deals Value</p>
              <h3>$420,800</h3>
              <div className="progress-track">
                <div className="progress-fill" />
              </div>
              <p className="metric-subtext">72% of quarterly target reached</p>
            </div>

            <div className="metric-card health-card">
              <div className="health-head">
                <p className="metric-label">Lead Health</p>
                <span className="health-icon">✳</span>
              </div>
              <h3>88%</h3>
              <p className="metric-subtext">
                Most leads have high activity scores and valid contact information.
              </p>
            </div>
          </div>
        </div>

        {selectedLead && (
          <>
            <div className="details-overlay" onClick={() => setSelectedLeadId(null)} />
            <aside className="lead-details-panel">
              <div className="lead-profile-head">
                <div className="lead-avatar big">{selectedLead.name.slice(0, 2).toUpperCase()}</div>
                <div className="lead-title-block">
                  <div className="lead-name-row">
                    <h3>{selectedLead.name}</h3>
                    <span className="badge new-badge">{selectedLead.status}</span>
                    <span className="badge high-badge">{selectedLead.priority}</span>
                  </div>
                  <p>{selectedLead.company}</p>
                </div>
                <button className="close-details-btn" onClick={() => setSelectedLeadId(null)}>
                  x
                </button>
              </div>

              <div className="meta-grid">
                <div className="meta-item">
                  <p className="meta-label">Email Address</p>
                  <p className="meta-value">{selectedLead.contact}</p>
                </div>
                <div className="meta-item">
                  <p className="meta-label">Phone Number</p>
                  <p className="meta-value">{selectedLead.phone}</p>
                </div>
                <div className="meta-item">
                  <p className="meta-label">Lead Source</p>
                  <span className="chip">{selectedLead.source}</span>
                </div>
                <div className="meta-item">
                  <p className="meta-label">Assigned To</p>
                  <p className="meta-value">{selectedLead.assignedTo}</p>
                </div>
              </div>
              <div className="follow-line">
                <div className="follow-up-card">
                  <div>
                    <p className="follow-up-label">Next Follow-up Overdue</p>
                    <h4>{formatFollowUp(selectedLead.followUp, selectedLead.followUpTime)}</h4>
                  </div>
                  <button onClick={handleSchedule}>Reschedule</button>
                </div>
              </div>
              <div className="lead-actions">
                <button onClick={handleAddNote}>Add Note</button>
                <button onClick={handleSchedule}>Schedule</button>
                <button className="status-btn" onClick={handleStatusChange}>Change Status</button>
              </div>

              <div className="drawer-tabs">
                <button className="active-tab">Notes</button>
                <button>Timeline</button>
                <button>Follow-ups</button>
              </div>

              <div className="note-input-box">
                <textarea
                  placeholder="Write a note..."
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                />
                <div className="note-tools">📎 @</div>
              </div>

              <div className="lead-notes">
                <div className="note-author">
                  <span className="mini-avatar">SJ</span>
                  <p>
                    <strong>Sarah J.</strong> · 2 hours ago
                  </p>
                </div>
                {selectedLead.notes.map((note, idx) => (
                  <p className="note-card" key={`${selectedLead.id}-note-${idx}`}>{note}</p>
                ))}
                <div className="note-author">
                  <span className="mini-avatar">SJ</span>
                  <p>
                    <strong>Sarah J.</strong> · yesterday, 4:12 PM
                  </p>
                </div>
              </div>

              <div className="drawer-footer">
                <span>Data Synced with LinkedIn</span>
                <button>View History</button>
              </div>
            </aside>
          </>
        )}
      </div>

      {selectedLead && scheduleState.isOpen && (
        <div className="reschedule-modal-overlay" onClick={closeScheduleModal}>
          <div className="reschedule-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reschedule Follow-up</h3>
            <div className="reschedule-form-row">
              <label htmlFor="lead-followup-date">Date</label>
              <input
                id="lead-followup-date"
                type="date"
                value={scheduleState.date}
                onChange={(e) =>
                  setScheduleState((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>
            <div className="reschedule-form-row">
              <label htmlFor="lead-followup-time">Time</label>
              <input
                id="lead-followup-time"
                type="time"
                value={scheduleState.time}
                onChange={(e) =>
                  setScheduleState((prev) => ({ ...prev, time: e.target.value }))
                }
              />
            </div>
            <div className="reschedule-modal-actions">
              <button type="button" onClick={closeScheduleModal}>
                Cancel
              </button>
              <button type="button" className="save-btn" onClick={submitSchedule}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveLead}
      />
    </Layout>
  );
}

export default Leads;
