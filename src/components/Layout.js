import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";
import {
    FaBars,
    FaBell,
    FaRegCommentDots,
    FaTachometerAlt,
    FaHandshake,
    FaAddressBook,
    FaTasks,
    FaChartBar,
    // FaCog,
    // FaQuestionCircle,
} from "react-icons/fa";

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const role = localStorage.getItem("role");
    const profileName = localStorage.getItem("name") || "Alex Sterling";
    const profileEmail = localStorage.getItem("email") || "alex.sterling@digitrend.com";
    const profilePhone = localStorage.getItem("phone") || "+1 555-010-2000";
    const profileDepartment = localStorage.getItem("department") || "Sales";
    const profileLocation = localStorage.getItem("location") || "San Francisco";

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
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className="dashboard-wrapper">
            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
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
                            <FaTachometerAlt /> Dashboard
                        </NavLink>

                        {/* ADMIN */}
                        {role === "admin" && (
                            <>
                                <NavLink to="/leads" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaHandshake /> Leads
                                </NavLink>
                                <NavLink to="/pipline" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaChartBar /> Pipeline
                                </NavLink>
                                <NavLink to="/followup" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaAddressBook /> FollowUp
                                </NavLink>
                                <NavLink to="/reports" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaAddressBook /> Reports
                                </NavLink>
                                <NavLink to="/setting" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaAddressBook /> Setting
                                </NavLink>
                                
                            </>
                        )}

                        {/* MANAGER */}
                        {role === "manager" && (
                            <>
                                <NavLink to="/leads" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaHandshake /> Leads
                                </NavLink>
                                <NavLink to="/tasks" className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }>
                                    <FaTasks /> Tasks
                                </NavLink>
                            </>
                        )}

                        {/* USER */}
                        {role === "user" && (
                            <NavLink to="/tasks" className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }>
                                <FaTasks /> Tasks
                            </NavLink>
                        )}
                    </div>
                </div>

                {/* <div className="sidebar-bottom">
                    <button className="new-deal-btn">New Deal</button>

                    <div className="nav-item bottom-item">
                        <FaCog /> Settings
                    </div>

                    <div className="nav-item bottom-item">
                        <FaQuestionCircle /> Support
                    </div>
                </div> */}
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
                        <span className="topbar-icon">
                            <FaBell />
                        </span>
                        <span className="topbar-icon">
                            <FaRegCommentDots />
                        </span>

                        <button
                            type="button"
                            className="profile-box"
                            onClick={() => setShowProfileDetails(true)}
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
                        onClick={() => setShowProfileDetails(false)}
                    />
                    <div className="profile-details-modal">
                        <div className="profile-details-header">
                            <h3>Profile Details</h3>
                            <button
                                type="button"
                                onClick={() => setShowProfileDetails(false)}
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
                                <strong>{profileName}</strong>
                            </div>
                            <div className="profile-detail-row">
                                <span>Role</span>
                                <strong>{role?.toUpperCase() || "USER"}</strong>
                            </div>
                            <div className="profile-detail-row">
                                <span>Email</span>
                                <strong>{profileEmail}</strong>
                            </div>
                            <div className="profile-detail-row">
                                <span>Phone</span>
                                <strong>{profilePhone}</strong>
                            </div>
                            <div className="profile-detail-row">
                                <span>Department</span>
                                <strong>{profileDepartment}</strong>
                            </div>
                            <div className="profile-detail-row">
                                <span>Location</span>
                                <strong>{profileLocation}</strong>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Layout;
