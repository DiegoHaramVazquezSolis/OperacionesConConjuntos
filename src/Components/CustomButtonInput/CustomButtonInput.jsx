import React from 'react';

const CustomButtonInput = ({ children, onClick = () => {} }) => {
    return (
        <button
            className="Button"
            value={children}
            onClick={onClick}>
                {children}
            </button>
    );
}

export default CustomButtonInput;
