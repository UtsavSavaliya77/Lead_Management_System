import React, { useState } from "react";
import "./AddLeadModal.css";
import Select2 from "./Select2";

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
  assignedTo: "",
  followUp: "",
  city: "",
};

const ASSIGNEE_OPTIONS = [
  { value: "Alex Rivera", label: "Alex Rivera" },
  { value: "Sarah Khan", label: "Sarah Khan" },
  { value: "David Thomas", label: "David Thomas" },
  { value: "Anita Nair", label: "Anita Nair" },
  { value: "Piyush Jain", label: "Piyush Jain" },
];

function AddLeadModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateField = (name, value) => {
    const trimmedValue = value.trim();
    const emailRegex =  /^[A-Za-z0-9_]+@[A-Za-z]+\.[A-Za-z]{2,}$/;

    if (name === "phone") {
      if (!trimmedValue) return "Phone number is required.";
      if (!/^\d+$/.test(trimmedValue)) return "Phone must contain digits only.";
      if (trimmedValue.length !== 10) return "Phone must be exactly 10 digits.";
    }

    if (name === "alternatePhone" && trimmedValue) {
      if (!/^\d+$/.test(trimmedValue)) return "Alternate phone must contain digits only.";
      if (trimmedValue.length !== 10) return "Alternate phone must be exactly 10 digits.";
    }

    if (name === "email" && trimmedValue && !emailRegex.test(trimmedValue)) {
      return "Enter a valid email address (example@domain.com).";
    }

    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "phone" || name === "alternatePhone" ? value.slice(0, 10) : value;
    const fieldError = validateField(name, nextValue);

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.leadName.trim()) {
      nextErrors.leadName = "Lead name is required.";
    }

    if (!formData.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }

    const phoneError = validateField("phone", formData.phone);
    if (phoneError) nextErrors.phone = phoneError;

    const alternatePhoneError = validateField("alternatePhone", formData.alternatePhone);
    if (alternatePhoneError) nextErrors.alternatePhone = alternatePhoneError;

    const emailError = validateField("email", formData.email);
    if (emailError) nextErrors.email = emailError;

    if (!formData.assignedTo.trim()) {
      nextErrors.assignedTo = "Please select assignee.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

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
    setErrors({});
    onClose();
  };

  return (
    <div className="alm-overlay">
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
              {errors.leadName && <small className="alm-error">{errors.leadName}</small>}
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
              {errors.companyName && <small className="alm-error">{errors.companyName}</small>}
            </label>

            <label className="alm-field">
              <span>PHONE</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone"
                inputMode="numeric"
                maxLength={10}
                required
              />
              {errors.phone && <small className="alm-error">{errors.phone}</small>}
            </label>

            <label className="alm-field">
              <span>ALTERNATE PHONE</span>
              <input
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                placeholder="Optional 10-digit number"
                inputMode="numeric"
                maxLength={10}
              />
              {errors.alternatePhone && <small className="alm-error">{errors.alternatePhone}</small>}
            </label>

            <label className="alm-field">
              <span>EMAIL</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@company.com"
              />
              {errors.email && <small className="alm-error">{errors.email}</small>}
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
              <Select2
                options={ASSIGNEE_OPTIONS}
                value={formData.assignedTo}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, assignedTo: value }));
                  setErrors((prev) => ({ ...prev, assignedTo: "" }));
                }}
                placeholder="Select assignee"
                isClearable={false}
              />
              {errors.assignedTo && <small className="alm-error">{errors.assignedTo}</small>}
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
