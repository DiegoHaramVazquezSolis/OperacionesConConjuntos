import React from 'react';

const CustomTetxInput = ({ label = '', placeholder = '', value, onChangeText = (text) => {}, disabled = false }) => {
    return (
        <div className="Input">
            <input
                type="text"
                id="input"
                className="Input-text"
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(e) => onChangeText(e.target.value)} />
            <label htmlFor="input" className="Input-label">{label}</label>
        </div>
    );
}

export default CustomTetxInput;
