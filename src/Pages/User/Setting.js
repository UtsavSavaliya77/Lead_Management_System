import React, { useMemo, useState } from "react";
import "./Setting.css";
import Layout from "../../components/Layout";

const USER_ROLES = ["admin", "manager", "user"];

const TAB_CONFIG = [
    { id: "users", label: "Users" },
    { id: "leadSources", label: "Lead Sources" },
    { id: "serviceInterests", label: "Service Interests" },
    { id: "pipelineRules", label: "Pipeline Rules" },
];

const Setting = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([
        { id: 1, name: "Admin One", email: "admin@lead.com", role: "admin", active: true },
        { id: 2, name: "Sales Manager", email: "manager@lead.com", role: "manager", active: true },
        { id: 3, name: "Sales User", email: "user@lead.com", role: "user", active: false },
    ]);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "user",
    });

    const [leadSources, setLeadSources] = useState(["Website", "Referral", "Walk-in"]);
    const [serviceInterests, setServiceInterests] = useState([
        "Digital Marketing",
        "Web Development",
        "SEO",
    ]);
    const [pipelineRules, setPipelineRules] = useState([
        "New leads default to Prospect stage",
        "Inactive leads move to Cold after 30 days",
    ]);

    const renderContent = () => {
        switch (activeTab) {
            case "users":
                return (
                    <UsersTab
                        users={users}
                        newUser={newUser}
                        setNewUser={setNewUser}
                        onCreateUser={() => handleCreateUser(newUser, setUsers, setNewUser)}
                        onToggleUserStatus={(userId) =>
                            setUsers((prevUsers) =>
                                prevUsers.map((user) =>
                                    user.id === userId ? { ...user, active: !user.active } : user
                                )
                            )
                        }
                        onRoleChange={(userId, role) =>
                            setUsers((prevUsers) =>
                                prevUsers.map((user) => (user.id === userId ? { ...user, role } : user))
                            )
                        }
                    />
                );
            case "leadSources":
                return (
                    <ConfigListTab
                        title="Lead Sources"
                        description="Manage dropdown options without changing code."
                        items={leadSources}
                        setItems={setLeadSources}
                        inputPlaceholder="Add lead source"
                    />
                );
            case "serviceInterests":
                return (
                    <ConfigListTab
                        title="Service Interests"
                        description="Maintain available service interest values."
                        items={serviceInterests}
                        setItems={setServiceInterests}
                        inputPlaceholder="Add service interest"
                    />
                );
            case "pipelineRules":
                return (
                    <ConfigListTab
                        title="Pipeline Rules"
                        description="Configurable list for rule labels and workflow notes."
                        items={pipelineRules}
                        setItems={setPipelineRules}
                        inputPlaceholder="Add pipeline rule"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="settings-container">
                <div className="settings-heading">
                    <h1>Settings</h1>
                    <p>Manage your settings and preferences.</p>
                </div>
                <div className="settings-tabs">
                    {TAB_CONFIG.map((tab) => (
                        <button
                            key={tab.id}
                            className={activeTab === tab.id ? "active" : ""}
                            onClick={() => setActiveTab(tab.id)}
                            type="button"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="settings-content">{renderContent()}</div>
            </div>
        </Layout>
    );
};

const handleCreateUser = (newUser, setUsers, setNewUser) => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
        return;
    }

    setUsers((prevUsers) => [
        ...prevUsers,
        {
            id: Date.now(),
            name: newUser.name.trim(),
            email: newUser.email.trim(),
            role: newUser.role,
            active: true,
        },
    ]);

    setNewUser({ name: "", email: "", role: "user" });
};

const UsersTab = ({
    users,
    newUser,
    setNewUser,
    onCreateUser,
    onToggleUserStatus,
    onRoleChange,
}) => (
    <div className="tab-content">
        <h3>Users</h3>
        <p className="tab-help-text">
            V1 includes user listing, create user form, role assignment, and activate/deactivate actions.
        </p>

        <div className="settings-form-grid">
            <input
                type="text"
                placeholder="Full name"
                value={newUser.name}
                onChange={(event) => setNewUser((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
                type="email"
                placeholder="Email address"
                value={newUser.email}
                onChange={(event) => setNewUser((prev) => ({ ...prev, email: event.target.value }))}
            />
            <select
                value={newUser.role}
                onChange={(event) => setNewUser((prev) => ({ ...prev, role: event.target.value }))}
            >
                {USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
            <button className="primary-btn" onClick={onCreateUser} type="button">
                Create User
            </button>
        </div>

        <div className="users-table-wrapper">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(event) => onRoleChange(user.id, event.target.value)}
                                >
                                    {USER_ROLES.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <span className={user.active ? "status-badge active" : "status-badge inactive"}>
                                    {user.active ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="text-btn"
                                    onClick={() => onToggleUserStatus(user.id)}
                                    type="button"
                                >
                                    {user.active ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ConfigListTab = ({ title, description, items, setItems, inputPlaceholder }) => {
    const [newItem, setNewItem] = useState("");
    const normalizedItems = useMemo(() => items.map((item) => item.trim().toLowerCase()), [items]);

    const onAddItem = () => {
        const value = newItem.trim();
        if (!value || normalizedItems.includes(value.toLowerCase())) {
            return;
        }
        setItems((prevItems) => [...prevItems, value]);
        setNewItem("");
    };

    const onDeleteItem = (itemToDelete) => {
        setItems((prevItems) => prevItems.filter((item) => item !== itemToDelete));
    };

    return (
        <div className="tab-content">
            <h3>{title}</h3>
            <p className="tab-help-text">{description}</p>

            <div className="settings-inline-form">
                <input
                    type="text"
                    placeholder={inputPlaceholder}
                    value={newItem}
                    onChange={(event) => setNewItem(event.target.value)}
                />
                <button className="primary-btn" onClick={onAddItem} type="button">
                    Add
                </button>
            </div>

            <ul className="config-list">
                {items.map((item) => (
                    <li key={item}>
                        <span>{item}</span>
                        <button className="text-btn danger" onClick={() => onDeleteItem(item)} type="button">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Setting;
