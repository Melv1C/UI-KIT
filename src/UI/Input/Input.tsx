import React, { useState } from 'react'

import './Input.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    widthLabel?: React.CSSProperties['width']
    width?: React.CSSProperties['width']
    icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
    className,
    label,
    type,
    widthLabel,
    width,
    icon,
    ...rest
}) => {

    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={`kit-input ${className}`}>
            {label && <div className="kit-input-label" style={{ width: widthLabel }}>{label}</div>}
            <div className="kit-input-field" style={{ width }}>
                {icon && <div className="kit-input-icon">{icon}</div>}
                <input 
                    type={type === 'password' && showPassword ? 'text' : type} 
                    {...rest} 
                />
                {type === 'password' && (
                    <div className="kit-input-eye" onClick={togglePassword}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </div>
                )}
            </div>
        </div>
    )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    widthLabel?: React.CSSProperties['width']
    width?: React.CSSProperties['width']
}

export const Select: React.FC<SelectProps> = ({
    className,
    label,
    widthLabel,
    width,
    ...rest
}) => {
    return (
        <div className={`kit-select ${className}`}>
            {label && <div className="kit-select-label" style={{ width: widthLabel }}>{label}</div>}
            <div className="kit-select-field" style={{ width }}>
                <select {...rest} />
            </div>
        </div>
    )
}
