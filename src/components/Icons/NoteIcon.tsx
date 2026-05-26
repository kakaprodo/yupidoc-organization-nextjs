import React from 'react';

interface IconProps {
    color?: string;  // Color class (default: 'text-gray-500')
    size?: number;   // Size (default: 5)
}

const NoteIcon: React.FC<IconProps> = ({ color = 'text-gray-500', size = 5 }) => {
    return (
        <svg
            className={`h-${size} w-${size} ${color}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <line x1="9" y1="7" x2="15" y2="7" />
            <line x1="9" y1="11" x2="15" y2="11" />
            <line x1="9" y1="15" x2="13" y2="15" />
        </svg>
    );
};

export default NoteIcon;
