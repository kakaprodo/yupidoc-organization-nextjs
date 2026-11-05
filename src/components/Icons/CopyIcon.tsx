import React from "react";

interface CopyIconProps {
    color?: string;
    size?: number | string;
    className?: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({
    color = "text-gray-500",
    size = 5,
    className = "",
}) => {
    return (
        <svg
            className={`h-${size} w-${size} ${color} ${className}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
    );
};

export default CopyIcon;
