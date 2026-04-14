import React, { useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Layout from "../../components/Layout";
import "./Reports.css";

const REPORT_ROWS = [
    { id: 1, createdAt: "2026-01-06", leadName: "Julianne Moore", company: "Starlight Ventures", source: "LinkedIn", assignee: "Sarah J.", city: "San Francisco", serviceInterest: "Cloud Migration", stage: "Won", followUp: "2026-01-20" },
    { id: 2, createdAt: "2026-01-14", leadName: "Marcus Thorne", company: "Apex Global Solutions", source: "Web", assignee: "David K.", city: "Austin", serviceInterest: "Security Audit", stage: "Qualified", followUp: "2026-01-22" },
    { id: 3, createdAt: "2026-02-03", leadName: "Elena Rodriguez", company: "Nexus Logistics", source: "Referral", assignee: "Sarah J.", city: "Seattle", serviceInterest: "Automation", stage: "Contacted", followUp: "2026-02-18" },
    { id: 4, createdAt: "2026-02-21", leadName: "Thomas Wright", company: "Wright & Co.", source: "Ads", assignee: "Maya", city: "Chicago", serviceInterest: "Digital Strategy", stage: "Lost", followUp: "2026-03-01" },
    { id: 5, createdAt: "2026-03-04", leadName: "Aman Verma", company: "GrowthHive", source: "Web", assignee: "Anita Nair", city: "Pune", serviceInterest: "CRM Setup", stage: "Qualified", followUp: "2026-03-14" },
    { id: 6, createdAt: "2026-03-17", leadName: "Neha Patil", company: "Acme Corp", source: "LinkedIn", assignee: "Piyush", city: "Mumbai", serviceInterest: "Cloud Migration", stage: "Won", followUp: "2026-03-23" },
    { id: 7, createdAt: "2026-04-03", leadName: "Mohit Gupta", company: "FinEdge", source: "Referral", assignee: "Maya", city: "Delhi", serviceInterest: "Integration", stage: "Lost", followUp: "2026-04-07" },
    { id: 8, createdAt: "2026-04-11", leadName: "Priya Iyer", company: "Cloudnova", source: "Ads", assignee: "David K.", city: "Bengaluru", serviceInterest: "Security Audit", stage: "Qualified", followUp: "2026-04-18" },
    { id: 9, createdAt: "2026-04-12", leadName: "Arjun Kapoor", company: "BluePeak", source: "Web", assignee: "Sarah J.", city: "Hyderabad", serviceInterest: "Digital Strategy", stage: "New", followUp: "2026-04-10" },
    { id: 10, createdAt: "2026-04-13", leadName: "John Carter", company: "NovaCraft", source: "LinkedIn", assignee: "Anita Nair", city: "Chennai", serviceInterest: "Automation", stage: "Contacted", followUp: "2026-04-12" },
];

const STAGE_COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"];

function Reports() {
    const [filters, setFilters] = useState({
        fromDate: "",
        toDate: "",
        source: "All",
        assignee: "All",
        city: "All",
        serviceInterest: "All",
    });

    const uniqueOptions = useMemo(() => {
        const getUnique = (key) => ["All", ...new Set(REPORT_ROWS.map((row) => row[key]))];
        return {
            sources: getUnique("source"),
            assignees: getUnique("assignee"),
            cities: getUnique("city"),
            services: getUnique("serviceInterest"),
        };
    }, []);

    const filteredRows = useMemo(() => {
        return REPORT_ROWS.filter((row) => {
            const fromOk = !filters.fromDate || row.createdAt >= filters.fromDate;
            const toOk = !filters.toDate || row.createdAt <= filters.toDate;
            const sourceOk = filters.source === "All" || row.source === filters.source;
            const assigneeOk = filters.assignee === "All" || row.assignee === filters.assignee;
            const cityOk = filters.city === "All" || row.city === filters.city;
            const serviceOk =
                filters.serviceInterest === "All" || row.serviceInterest === filters.serviceInterest;
            return fromOk && toOk && sourceOk && assigneeOk && cityOk && serviceOk;
        });
    }, [filters]);

    const metrics = useMemo(() => {
        const total = filteredRows.length;
        const qualified = filteredRows.filter((row) => row.stage === "Qualified").length;
        const won = filteredRows.filter((row) => row.stage === "Won").length;
        const lost = filteredRows.filter((row) => row.stage === "Lost").length;
        const overdue = filteredRows.filter((row) => {
            const isClosed = row.stage === "Won" || row.stage === "Lost";
            return !isClosed && row.followUp < new Date().toISOString().slice(0, 10);
        }).length;
        const qualifiedRate = total ? ((qualified / total) * 100).toFixed(1) : "0.0";
        const winRate = won + lost ? ((won / (won + lost)) * 100).toFixed(1) : "0.0";

        return { total, qualifiedRate, winRate, won, lost, overdue };
    }, [filteredRows]);

    const leadsBySource = useMemo(() => {
        const grouped = filteredRows.reduce((acc, row) => {
            acc[row.source] = (acc[row.source] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [filteredRows]);

    const leadsByStage = useMemo(() => {
        const grouped = filteredRows.reduce((acc, row) => {
            acc[row.stage] = (acc[row.stage] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [filteredRows]);

    const wonLostTrend = useMemo(() => {
        const grouped = {};
        filteredRows.forEach((row) => {
            const month = row.createdAt.slice(0, 7);
            if (!grouped[month]) grouped[month] = { month, won: 0, lost: 0 };
            if (row.stage === "Won") grouped[month].won += 1;
            if (row.stage === "Lost") grouped[month].lost += 1;
        });
        return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
    }, [filteredRows]);

    const assigneePerformance = useMemo(() => {
        const grouped = {};
        filteredRows.forEach((row) => {
            if (!grouped[row.assignee]) grouped[row.assignee] = { assignee: row.assignee, total: 0, won: 0 };
            grouped[row.assignee].total += 1;
            if (row.stage === "Won") grouped[row.assignee].won += 1;
        });
        return Object.values(grouped);
    }, [filteredRows]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleExportCsv = () => {
        if (!filteredRows.length) {
            window.alert("No report rows available to export.");
            return;
        }
        const headers = [
            "Created Date",
            "Lead Name",
            "Company",
            "Source",
            "Assignee",
            "City",
            "Service Interest",
            "Stage",
            "Next Follow-up",
        ];
        const formatDateForCsv = (value) => {
            if (!value) return "";
            const parsed = new Date(value);
            if (Number.isNaN(parsed.getTime())) return String(value);
            return parsed.toLocaleDateString("en-GB");
        };

        const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
        const forceExcelText = (value) => `="${String(value ?? "").replace(/"/g, '""')}"`;
        const rows = filteredRows.map((row) => [
            forceExcelText(formatDateForCsv(row.createdAt)),
            row.leadName,
            row.company,
            row.source,
            row.assignee,
            row.city,
            row.serviceInterest,
            row.stage,
            forceExcelText(formatDateForCsv(row.followUp)),
        ]);
        const csv = [headers, ...rows]
            .map((line) => line.map((value) => (String(value).startsWith("=\"") ? value : escapeCsv(value))).join(","))
            .join("\n");
        const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `reports-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Layout>
            <div className="reports-page">
                <div className="reports-heading">
                    <h1>Reports</h1>
                    <p>Insights for lead creation, conversion, and assignee performance.</p>
                </div>

                <div className="reports-filters">
                    <label>
                        <span>From</span>
                        <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} />
                    </label>
                    <label>
                        <span>To</span>
                        <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} />
                    </label>
                    <label>
                        <span>Source</span>
                        <select name="source" value={filters.source} onChange={handleFilterChange}>
                            {uniqueOptions.sources.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Assignee</span>
                        <select name="assignee" value={filters.assignee} onChange={handleFilterChange}>
                            {uniqueOptions.assignees.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>City</span>
                        <select name="city" value={filters.city} onChange={handleFilterChange}>
                            {uniqueOptions.cities.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Service Interest</span>
                        <select
                            name="serviceInterest"
                            value={filters.serviceInterest}
                            onChange={handleFilterChange}
                        >
                            {uniqueOptions.services.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="reports-widgets">
                    <div className="widget-card"><p>Total Created</p><h3>{metrics.total}</h3></div>
                    <div className="widget-card"><p>Qualified Rate</p><h3>{metrics.qualifiedRate}%</h3></div>
                    <div className="widget-card"><p>Win Rate</p><h3>{metrics.winRate}%</h3></div>
                    <div className="widget-card"><p>Won Count</p><h3>{metrics.won}</h3></div>
                    <div className="widget-card"><p>Lost Count</p><h3>{metrics.lost}</h3></div>
                    <div className="widget-card"><p>Overdue Count</p><h3>{metrics.overdue}</h3></div>
                </div>

                <div className="reports-charts">
                    <div className="chart-card">
                        <h4>Leads by Source</h4>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={leadsBySource}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h4>Leads by Stage</h4>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie data={leadsByStage} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                                    {leadsByStage.map((entry, index) => (
                                        <Cell key={entry.name} fill={STAGE_COLORS[index % STAGE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h4>Won vs Lost Trend</h4>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={wonLostTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="won" stroke="#10b981" strokeWidth={2} />
                                <Line type="monotone" dataKey="lost" stroke="#ef4444" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h4>Assignee Performance</h4>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={assigneePerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="assignee" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill="#6366f1" />
                                <Bar dataKey="won" fill="#22c55e" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="report-table-card">
                    <div className="report-table-head">
                        <h4>Report Details</h4>
                        <button type="button" onClick={handleExportCsv}>Export CSV</button>
                    </div>
                    <div className="report-table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Created</th>
                                    <th>Lead</th>
                                    <th>Company</th>
                                    <th>Source</th>
                                    <th>Assignee</th>
                                    <th>City</th>
                                    <th>Service</th>
                                    <th>Stage</th>
                                    <th>Follow-up</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRows.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.createdAt}</td>
                                        <td>{row.leadName}</td>
                                        <td>{row.company}</td>
                                        <td>{row.source}</td>
                                        <td>{row.assignee}</td>
                                        <td>{row.city}</td>
                                        <td>{row.serviceInterest}</td>
                                        <td>{row.stage}</td>
                                        <td>{row.followUp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Reports;
