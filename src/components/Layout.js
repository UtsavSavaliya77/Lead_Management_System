import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";
import {
    FaBars,
    FaBell,
    FaRegCommentDots,
    FaTachometerAlt,
    FaHandshake,
    FaTasks,
    FaChartBar,
    FaCalendarCheck,
    FaUserCog,
} from "react-icons/fa";
import { MdOutlineViewKanban } from "react-icons/md";


function Layout({ children }) {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [openTopbarPanel, setOpenTopbarPanel] = useState("");
    const role = localStorage.getItem("role");
    const notifications = [
        { id: "n1", title: "New lead assigned", meta: "Priya Sharma - 2m ago" },
        { id: "n2", title: "Follow-up due today", meta: "Rahul Mehta - 15m ago" },
        { id: "n3", title: "Pipeline updated", meta: "Qualified to Proposal Sent" },
    ];
    const chats = [
        { id: "c1", name: "Sales Team", message: "Meeting moved to 4:30 PM" },
        { id: "c2", name: "Anita Nair", message: "Please review the new proposal" },
        { id: "c3", name: "Support Desk", message: "Client asked for status update" },
    ];
    const [profileForm, setProfileForm] = useState({
        name: localStorage.getItem("name") || "Alex Sterling",
        email: localStorage.getItem("email") || "alex.sterling@digitrend.com",
        phone: localStorage.getItem("phone") || "+1 555-010-2000",
        department: localStorage.getItem("department") || "Sales",
        location: localStorage.getItem("location") || "San Francisco",
    });
    const profileName = profileForm.name;
    const profileEmail = profileForm.email;
    const profilePhone = profileForm.phone;
    const profileDepartment = profileForm.department;
    const profileLocation = profileForm.location;

    const resetProfileForm = () => {
        setProfileForm({
            name: localStorage.getItem("name") || "Alex Sterling",
            email: localStorage.getItem("email") || "alex.sterling@digitrend.com",
            phone: localStorage.getItem("phone") || "+1 555-010-2000",
            department: localStorage.getItem("department") || "Sales",
            location: localStorage.getItem("location") || "San Francisco",
        });
    };

    const handleProfileFieldChange = (event) => {
        const { name, value } = event.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenProfileDetails = () => {
        resetProfileForm();
        setIsEditingProfile(false);
        setShowProfileDetails(true);
    };

    const handleCloseProfileDetails = () => {
        setShowProfileDetails(false);
        setIsEditingProfile(false);
    };

    const handleStartEditProfile = () => {
        resetProfileForm();
        setIsEditingProfile(true);
    };

    const handleCancelEditProfile = () => {
        resetProfileForm();
        setIsEditingProfile(false);
    };

    const handleSaveProfile = () => {
        localStorage.setItem("name", profileForm.name.trim() || "Alex Sterling");
        localStorage.setItem("email", profileForm.email.trim() || "alex.sterling@digitrend.com");
        localStorage.setItem("phone", profileForm.phone.trim() || "+1 555-010-2000");
        localStorage.setItem("department", profileForm.department.trim() || "Sales");
        localStorage.setItem("location", profileForm.location.trim() || "San Francisco");
        resetProfileForm();
        setIsEditingProfile(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setShowProfileDetails(false);
        setIsEditingProfile(false);
        setOpenTopbarPanel("");
        navigate("/", { replace: true });
    };

    const toggleTopbarPanel = (panelName) => {
        setOpenTopbarPanel((prev) => (prev === panelName ? "" : panelName));
    };

    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth > 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setShowProfileDetails(false);
                setOpenTopbarPanel("");
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className="dashboard-wrapper">
            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? "open" : "desktop-collapsed"}`}>
                {/* {sidebarOpen && window.innerWidth <= 1024 && (
                    <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
                )} */}

                <div>
                    <div className="brand-section">
                        <div className="brand-mark">◉</div>
                        <div className="brand-text">
                            <h2>DiGi Trend</h2>
                            <p>PRECISION AUTHORITY</p>
                        </div>
                    </div>
                    <div className="nav-list">
                        <NavLink to={`/${role}-dashboard`} className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }>
                            <span className="nav-icon"><FaTachometerAlt /></span>
                            <span className="nav-label">Dashboard</span>
                        </NavLink>

                        {/* ADMIN */}
                        {role === "admin" && (
                            <>
                                <NavLink to="/leads" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <span className="nav-icon"><FaHandshake /></span>
                                    <span className="nav-label">Leads</span>
                                </NavLink>
                                <NavLink to="/pipline" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <span className="nav-icon"><MdOutlineViewKanban /></span>
                                    <span className="nav-label">Pipeline</span>
                                </NavLink>
                                <NavLink to="/followup" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <span className="nav-icon"><FaCalendarCheck /></span>
                                    <span className="nav-label">FollowUp</span>
                                </NavLink>
                                <NavLink to="/reports" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <span className="nav-icon"><FaChartBar /></span>
                                    <span className="nav-label">Reports</span>
                                </NavLink>
                                
                            </>
                        )}

                        {/* MANAGER */}
                        {role === "manager" && (
                            <>
                                <NavLink to="/leads" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <span className="nav-icon"><FaHandshake /></span>
                                    <span className="nav-label">Leads</span>
                                </NavLink>
                                <NavLink to="/tasks" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <span className="nav-icon"><FaTasks /></span>
                                    <span className="nav-label">Tasks</span>
                                </NavLink>
                            </>
                        )}

                        {/* USER */}
                        {role === "user" && (
                            <NavLink to="/tasks" className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }>
                                <span className="nav-icon"><FaTasks /></span>
                                <span className="nav-label">Tasks</span>
                            </NavLink>
                        )}
                    </div>
                </div>

                {role === "admin" && (
                    <div className="sidebar-bottom">
                        <NavLink to="/setting" className={({ isActive }) =>
                            isActive ? "nav-item active bottom-item" : "nav-item bottom-item"
                        }>
                            <span className="nav-icon"><FaUserCog /></span>
                            <span className="nav-label">Settings</span>
                        </NavLink>
                    </div>
                )}
            </aside>

            {/* MAIN */}
            <div className="main-area">
                {/* TOPBAR */}
                <header className="topbar">
                    <div className="topbar-left">
                        <button
                            className="menu-btn"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <FaBars />
                        </button>

                        <div className="search-box">
                            <input type="text" placeholder="SEARCH COMMANDS..." />
                        </div>
                    </div>

                    <div className="topbar-right">
                        <button
                            type="button"
                            className="topbar-icon topbar-icon-btn"
                            onClick={() => toggleTopbarPanel("notifications")}
                            aria-label="Open notifications"
                        >
                            <FaBell />
                            <span className="topbar-icon-badge">{notifications.length}</span>
                            {openTopbarPanel === "notifications" && (
                                <div className="topbar-dropdown">
                                    <h4>Notifications</h4>
                                    {notifications.map((item) => (
                                        <div className="topbar-dropdown-item" key={item.id}>
                                            <p>{item.title}</p>
                                            <small>{item.meta}</small>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </button>
                        <button
                            type="button"
                            className="topbar-icon topbar-icon-btn"
                            onClick={() => toggleTopbarPanel("chats")}
                            aria-label="Open chats"
                        >
                            <FaRegCommentDots />
                            <span className="topbar-icon-badge">{chats.length}</span>
                            {openTopbarPanel === "chats" && (
                                <div className="topbar-dropdown">
                                    <h4>Chats</h4>
                                    {chats.map((item) => (
                                        <div className="topbar-dropdown-item" key={item.id}>
                                            <p>{item.name}</p>
                                            <small>{item.message}</small>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </button>

                        <button
                            type="button"
                            className="profile-box"
                            onClick={handleOpenProfileDetails}
                        >
                            <div className="profile-info">
                                <h4>{profileName.toUpperCase()}</h4>
                                <p>{role?.toUpperCase()}</p>
                            </div>

                            <img
                                className="profile-img"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                                alt="profile"
                            />
                        </button>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <div className="page-content">{children}</div>
            </div>

            {showProfileDetails && (
                <>
                    <div
                        className="profile-overlay"
                        onClick={handleCloseProfileDetails}
                    />
                    <div className="profile-details-modal">
                        <div className="profile-details-header">
                            <h3>Profile Details</h3>
                            <button
                                type="button"
                                onClick={handleCloseProfileDetails}
                                aria-label="Close profile details"
                            >
                                x
                            </button>
                        </div>

                        <div className="profile-details-body">
                            <img
                                className="profile-avatar-lg"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                                alt="profile"
                            />

                            <div className="profile-detail-row">
                                <span>Name</span>
                                {isEditingProfile ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileName}
                                        onChange={handleProfileFieldChange}
                                        className="profile-detail-input"
                                    />
                                ) : (
                                    <strong>{profileName}</strong>
                                )}
                            </div>
                            <div className="profile-detail-row">
                                <span>Role</span>
                                <strong>{role?.toUpperCase() || "USER"}</strong>
                            </div>
                            <div className="profile-detail-row">
                                <span>Email</span>
                                {isEditingProfile ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileEmail}
                                        onChange={handleProfileFieldChange}
                                        className="profile-detail-input"
                                    />
                                ) : (
                                    <strong>{profileEmail}</strong>
                                )}
                            </div>
                            <div className="profile-detail-row">
                                <span>Phone</span>
                                {isEditingProfile ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profilePhone}
                                        onChange={handleProfileFieldChange}
                                        className="profile-detail-input"
                                    />
                                ) : (
                                    <strong>{profilePhone}</strong>
                                )}
                            </div>
                            <div className="profile-detail-row">
                                <span>Department</span>
                                {isEditingProfile ? (
                                    <input
                                        type="text"
                                        name="department"
                                        value={profileDepartment}
                                        onChange={handleProfileFieldChange}
                                        className="profile-detail-input"
                                    />
                                ) : (
                                    <strong>{profileDepartment}</strong>
                                )}
                            </div>
                            <div className="profile-detail-row">
                                <span>Location</span>
                                {isEditingProfile ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={profileLocation}
                                        onChange={handleProfileFieldChange}
                                        className="profile-detail-input"
                                    />
                                ) : (
                                    <strong>{profileLocation}</strong>
                                )}
                            </div>
                            <div className="profile-detail-actions">
                                {isEditingProfile ? (
                                    <>
                                        <button
                                            type="button"
                                            className="profile-action-btn cancel"
                                            onClick={handleCancelEditProfile}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="profile-action-btn save"
                                            onClick={handleSaveProfile}
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="profile-action-btn edit"
                                            onClick={handleStartEditProfile}
                                        >
                                            Edit Profile
                                        </button>
                                        <button
                                            type="button"
                                            className="profile-action-btn logout"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Layout;
