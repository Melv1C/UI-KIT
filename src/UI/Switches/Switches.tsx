import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface SwitchProps {
    checked: boolean,
    onChange: () => void,
    label?: string,
    position?: 'top' | 'bottom' | 'start' | 'end',
    color?: 'info' | 'success' | 'warning' | 'error'
}

export const MySwitch: React.FC<SwitchProps> = ({ 
    checked, 
    onChange,
    label,
    position = 'start',
    color = 'info'
}) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={() => onChange()}
                    color={color}
                />
            }
            label={label}
            labelPlacement={position}
        />
    )
}