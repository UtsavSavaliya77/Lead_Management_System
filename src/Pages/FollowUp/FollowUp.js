import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./FollowUp.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


function FollowUp() {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overdue");
  const localizer = momentLocalizer(moment);
  const [calendarView, setCalendarView] = useState("month");
  const [calendarDate, setCalendarDate] = useState(new Date());



  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      leadName: "John Doe",
      company: "ABC Ltd",
      phone: "+91 9876543210",
      date: "2026-04-13",
      time: "10:00",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      leadName: "Jane Smith",
      company: "XYZ Pvt",
      phone: "+91 9123456780",
      date: "2026-04-12",
      time: "14:00",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      leadName: "Rahul Mehta",
      company: "TechSoft",
      phone: "+91 9988776655",
      date: "2026-04-15",
      time: "11:30",
      status: "pending",
      priority: "low",
    },
    {
      id: 4,
      leadName: "John Doe",
      company: "ABC Ltd",
      phone: "+91 9876543210",
      date: "2026-04-11",
      time: "10:00",
      status: "pending",
      priority: "high",
    },
    {
      id: 5,
      leadName: "Jane Smith",
      company: "XYZ Pvt",
      phone: "+91 9123456780",
      date: "2026-04-10",
      time: "14:00",
      status: "pending",
      priority: "medium",
    },
    {
      id: 6,
      leadName: "Rahul Mehta",
      company: "TechSoft",
      phone: "+91 9988776655",
      date: "2026-04-16",
      time: "11:30",
      status: "pending",
      priority: "low",
    },
  ]);

  const today = new Date().toISOString().split("T")[0];

  const filtered = followUps.filter((f) =>
    f.leadName.toLowerCase().includes(search.toLowerCase())
  );

  const overdue = filtered.filter(
    (f) => f.date < today && f.status !== "done"
  );
  const todayList = filtered.filter((f) => f.date === today && f.status !== "done");
  const upcoming = filtered.filter((f) => f.date > today && f.status !== "done");
  const completed = filtered.filter((f) => f.status === "done");

  const markDone = (id) => {
    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "done" } : f
      )
    );
  };

  const handleReschedule = (id, currentDate, currentTime) => {
    const nextDate = window.prompt("Enter new date (YYYY-MM-DD):", currentDate);
    if (nextDate === null) return;

    const cleanDate = nextDate.trim();
    if (!cleanDate) return;

    const parsedDate = new Date(cleanDate);
    if (Number.isNaN(parsedDate.getTime())) {
      window.alert("Please enter a valid date in YYYY-MM-DD format.");
      return;
    }

    const nextTime = window.prompt("Enter new time (HH:mm):", currentTime);
    if (nextTime === null) return;

    const cleanTime = nextTime.trim();
    const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(cleanTime);
    if (!isValidTime) {
      window.alert("Please enter a valid time in 24-hour format (HH:mm).");
      return;
    }

    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, date: cleanDate, time: cleanTime } : f
      )
    );
  };

  const handleAddNote = (id) => {
    const note = window.prompt("Add follow-up note:");
    if (note === null) return;

    const cleanNote = note.trim();
    if (!cleanNote) return;

    setFollowUps((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const existingNotes = f.notes || [];
        return { ...f, notes: [...existingNotes, cleanNote] };
      })
    );
  };

  const events = followUps.map((f) => {
    const start = new Date(`${f.date}T${f.time}`);
    const end = new Date(start.getTime() + 30 * 60000);

    return {
      title: f.leadName,
      start,
      end,
      allDay: false,
    };
  });



  const getPriorityClass = (priority) => {
    if (priority === "high") return "priority high";
    if (priority === "medium") return "priority medium";
    return "priority low";
  };

  const renderCard = (f, type) => (
    <div key={f.id} className={`card ${type}`}>
      <div className="card-top">
        <div>
          <h4>{f.leadName}</h4>
          <p className="company">{f.company}</p>
        </div>

        <span className={getPriorityClass(f.priority)}>
          {f.priority}
        </span>
      </div>

      <div className="card-middle">
        <p>📞 {f.phone}</p>
        <p>📅 {f.date} | {f.time}</p>
      </div>

      <div className="card-bottom">
        <span className={`status ${f.status}`}>
          {f.status}
        </span>

        <div className="actions">
          {f.status !== "done" && <button onClick={() => markDone(f.id)}>✔</button>}
          <button onClick={() => handleReschedule(f.id, f.date, f.time)}>⏰</button>
          <button onClick={() => handleAddNote(f.id)}>📝</button>
        </div>
      </div>
    </div>
  );

  const tabOptions = [
    { key: "overdue", label: "Overdue", data: overdue, type: "overdue" },
    { key: "today", label: "Today", data: todayList, type: "today" },
    { key: "upcoming", label: "Upcoming", data: upcoming, type: "upcoming" },
    { key: "completed", label: "Completed", data: completed, type: "completed" },
  ];

  const selectedTab = tabOptions.find((tab) => tab.key === activeTab) || tabOptions[0];

  return (
    <Layout>
      <div className="followups-container">

        {/* 🔹 Header */}
        <div className="header">
          <div>
            <h2>Follow-up</h2>
            <p className="subtitle">Manage your daily tasks</p>
          </div>

          <div className="header-right">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="toggle">
              <button
                className={view === "list" ? "active" : ""}
                onClick={() => setView("list")}
              >
                List
              </button>
              <button
                className={view === "calendar" ? "active" : ""}
                onClick={() => setView("calendar")}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Stats */}
        <div className="stats">
          <div className="stat-card">
            <h4>{todayList.length}</h4>
            <p>Today</p>
          </div>
          <div className="stat-card overdue">
            <h4>{overdue.length}</h4>
            <p>Overdue</p>
          </div>
          <div className="stat-card completed">
            <h4>{completed.length}</h4>
            <p>Completed</p>
          </div>
        </div>

        {/* 🔹 List */}
        {view === "list" ? (
          <div className="list">
            <div className="followup-tabs">
              {tabOptions.map((tab) => (
                <button
                  key={tab.key}
                  className={activeTab === tab.key ? "active" : ""}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label} ({tab.data.length})
                </button>
              ))}
            </div>

            <div className="section">
              <h3>{selectedTab.label}</h3>
              <div className="grid">
                {selectedTab.data.length > 0 ? (
                  selectedTab.data.map((f) => renderCard(f, selectedTab.type))
                ) : (
                  <p className="empty-state">No follow-ups in this tab.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="calendar-wrapper">
            <div className="calendar">

              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"

                views={["month", "week", "day", "agenda"]}

                view={calendarView}
                date={calendarDate}

                onView={(view) => setCalendarView(view)}
                onNavigate={(date) => setCalendarDate(date)}

                toolbar={true}
                popup={true}

                style={{ height: "80vh" }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FollowUp;
