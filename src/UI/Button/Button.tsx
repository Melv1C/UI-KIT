import React from 'react'

import './Button.css'

interface BouttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "info" | "success" | "danger" | "warning",
    rounded?: boolean,
}

export const Button: React.FC<BouttonProps> = ({ 
    variant = "info",
    rounded = false,
    className,
    ...rest }) => {
    return (
        <button className={`kit-btn kit-btn-${variant} ${className} ${rounded ? 'kit-btn-rounded' : ''}`} {...rest} />
    )
}

