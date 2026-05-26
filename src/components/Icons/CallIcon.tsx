import React from "react";

interface CallIconProps {
    color?: string;
    size?: number | string;
    className?: string;
}

const CallIcon: React.FC<CallIconProps> = ({
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
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        </svg>
    );
};

export default CallIcon;
