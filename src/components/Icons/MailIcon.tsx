import React from "react";

interface MailIconProps {
    color?: string;
    size?: number | string;
    className?: string;
}

const MailIcon: React.FC<MailIconProps> = ({
    color = "text-red-500",
    size = 8,
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
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
        </svg>
    );
};

export default MailIcon;
