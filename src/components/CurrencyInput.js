import React from "react";

const CurrencyInput = ({
  title,
  value,
  onChange,
  placeholder = "Enter amount",
}) => {
  const handleChange = (event) => {
    // No se permiten valores negativos
    const newValue = event.target.value;
    if (newValue >= 0) {
      onChange(newValue);
    }
  };

  return (
    <div className="currency-input-container">
      <strong className="input-title">{title}</strong>
      <div className="currency-input-wrapper">
        <input
          type="number"
          className="custom-element"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
