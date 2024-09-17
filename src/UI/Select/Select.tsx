import React, { useEffect, useState } from 'react'
import './Select.css'

export type SelectOption = {
    label: string
    value: string | number
}

function isEqual(option1: SelectOption, option2: SelectOption) {
    return (option1.value === option2.value) && (option1.label === option2.label)
}

type SelectProps = {
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
    className?: string
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    className,
}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    function clearOptions() {
        onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (!value || !isEqual(option, value)) {
            onChange(option)
        }
    }

    function isOptionSelected(option: SelectOption) {
        return value && isEqual(option, value)
    }

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0)
        }
    }, [isOpen])

    return (
        <div 
            className={`kit-select ${className}`} 
            tabIndex={0}
            onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
        >
            <span className="kit-select-value">{value?.label}</span>
            <button 
                className="kit-select-clear"
                onClick={(e) => {
                    e.stopPropagation()
                    clearOptions()
                }}
            >
                &times;
            </button>
            <div className="kit-select-divider" />
            <div className="kit-select-caret" />
            <ul className={`kit-select-options ${isOpen ? 'show' : ''}`}>
                {options.map((option, index) => (
                    <li
                        key={option.value}
                        className={`kit-select-option ${isOptionSelected(option) ? 'selected' : ''} ${highlightedIndex === index ? 'highlighted' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>        
        </div>
    )
}
