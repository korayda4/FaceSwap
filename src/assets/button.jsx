import React from 'react';
import { Button } from 'antd';

const GlobalButton = ({ type, text, onClick , bgColor }) => (
    <Button 
        type={type} 
        onClick={onClick} 
        style={{ backgroundColor: bgColor }}
    >
        {text}
    </Button>
);

export default GlobalButton;
