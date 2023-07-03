import React from 'react'

interface IBadgeProps {
    children: React.ReactNode
}
const Badge: React.FC<IBadgeProps> = ({ children }) => {
    return (
        <span className='corleon-badge'>
            {children}
        </span>
    )
}

export default Badge
