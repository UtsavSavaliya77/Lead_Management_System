// components/SelectField.jsx
import React from "react";
import Select from "react-select";

const SelectField = ({
  label,
  options,
  value,          // string OR array (for multi)
  onChange,
  isMulti = false,
  placeholder = "Select...",
  isClearable = true,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: "#d1d5db",
      minHeight: "10px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  // 👉 Convert string → object (for react-select)
  const selectedValue = isMulti
    ? options.filter((opt) => value?.includes(opt.value))
    : options.find((opt) => opt.value === value) || null;

  // 👉 Convert object → string (for your state)
  const handleChange = (selected) => {
    if (isMulti) {
      onChange(selected ? selected.map((item) => item.value) : []);
    } else {
      onChange(selected ? selected.value : "");
    }
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "5px" }}>
          {label}
        </label>
      )}

      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
        isMulti={isMulti}
        placeholder={placeholder}
        isClearable={isClearable}
        styles={customStyles}
      />
    </div>
  );
};

export default SelectField;
