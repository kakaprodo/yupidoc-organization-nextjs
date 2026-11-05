import React from "react";

interface ValidIconProps {
    color?: string;
    size?: number | string;
}

const ValidIcon: React.FC<ValidIconProps> = ({
    color = "text-gray-500",
    size = 6,
}) => {
    return (
        <svg
            className={`h-${size} w-${size} ${color}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
};

export default ValidIcon;
