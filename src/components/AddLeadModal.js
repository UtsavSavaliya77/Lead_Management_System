import React, { useState } from "react";
import "./AddLeadModal.css";

const INITIAL_FORM = {
  leadName: "",
  companyName: "",
  phone: "",
  alternatePhone: "",
  email: "",
  businessType: "",
  source: "LinkedIn",
  priority: "Medium",
  serviceInterest: "",
  budgetRange: "",
  tags: "",
  assignedTo: "Alex Rivera",
  followUp: "",
  city: "",
};

function AddLeadModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.leadName.trim() || !formData.companyName.trim()) return;

    onSave({
      id: Date.now(),
      name: formData.leadName.trim(),
      company: formData.companyName.trim(),
      contact: formData.email.trim() || "not-provided@email.com",
      phone: formData.phone.trim() || "--",
      source: formData.source,
      status: "New",
      priority: formData.priority,
      assignedTo: formData.assignedTo.trim() || "Unassigned",
      followUp: formData.followUp || "--",
      city: formData.city.trim() || "--",
      businessType: formData.businessType || "General",
      budgetRange: formData.budgetRange.trim() || "--",
      serviceInterest: formData.serviceInterest
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      tags: formData.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      notes: ["Lead created from Add Lead form."],
    });

    setFormData(INITIAL_FORM);
    onClose();
  };

  return (
    <div className="alm-overlay" onClick={onClose}>
      <div className="alm-modal" onClick={(event) => event.stopPropagation()}>
        <div className="alm-header">
          <div>
            <h2>Create New Lead</h2>
          </div>
          <button type="button" onClick={onClose}>x</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="alm-grid">
            <label className="alm-field">
              <span>LEAD NAME *</span>
              <input
                name="leadName"
                value={formData.leadName}
                onChange={handleChange}
                placeholder="e.g. Jonathan Ive"
                required
              />
            </label>

            <label className="alm-field">
              <span>COMPANY NAME *</span>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Cupertino Design Co."
                required
              />
            </label>

            <label className="alm-field">
              <span>PHONE</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </label>

            <label className="alm-field">
              <span>ALTERNATE PHONE</span>
              <input
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                placeholder="Mobile or Home"
              />
            </label>

            <label className="alm-field">
              <span>EMAIL</span>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@company.com"
              />
            </label>

            <label className="alm-field">
              <span>BUSINESS TYPE</span>
              <input
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder="Enter business type"
              />
            </label>

            <label className="alm-field">
              <span>SOURCE</span>
              <select name="source" value={formData.source} onChange={handleChange}>
                <option>LinkedIn</option>
                <option>Web</option>
                <option>Referral</option>
                <option>Ads</option>
              </select>
            </label>

            <label className="alm-field">
              <span>PRIORITY</span>
              <div className="alm-priority-group">
                {["Low", "Medium", "High"].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    className={
                      formData.priority === priority
                        ? "alm-priority-pill active"
                        : "alm-priority-pill"
                    }
                    onClick={() => setFormData((prev) => ({ ...prev, priority }))}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </label>

            <label className="alm-field alm-full">
              <span>SERVICE INTEREST</span>
              <input
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                placeholder="Digital Strategy, Cloud Migration"
              />
            </label>

            <label className="alm-field">
              <span>BUDGET RANGE</span>
              <input
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                placeholder="$ 10,000 - 50,000"
              />
            </label>

            <label className="alm-field">
              <span>ASSIGNED TO</span>
              <input
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                placeholder="Alex Rivera"
              />
            </label>

            <label className="alm-field">
              <span>TAGS</span>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="press enter to add..."
              />
            </label>

            <label className="alm-field">
              <span>FOLLOW UP</span>
              <input
                type="date"
                name="followUp"
                value={formData.followUp}
                onChange={handleChange}
              />
            </label>

            <label className="alm-field">
              <span>CITY</span>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. San Francisco"
              />
            </label>
          </div>

          <div className="alm-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="alm-save-btn">Save Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;
