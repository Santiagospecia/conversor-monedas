import React from 'react';

const CurrencySelect = ({ title, value, onChange, options }) => {
  return (
    <div className='currency-input-container'>
      <strong className="input-title">{title}</strong>
    
        <select
          className="custom-element"
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      
    </div>
  );
};

export default CurrencySelect;
