import React from 'react'

import './Container.css'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    
}

export const Container: React.FC<ContainerProps> = ({
    className,
    ...rest
}) => {
    return (
        <div className={`kit-container ${className}`} {...rest} />
    )
}

export const RowContainer: React.FC<ContainerProps> = ({
    className,
    ...rest
}) => {
    return (
        <div className={`kit-container kit-container-row ${className}`} {...rest} />
    )
}

export const ColumnContainer: React.FC<ContainerProps> = ({
    className,
    ...rest
}) => {
    return (
        <div className={`kit-container kit-container-column ${className}`} {...rest} />
    )
}

