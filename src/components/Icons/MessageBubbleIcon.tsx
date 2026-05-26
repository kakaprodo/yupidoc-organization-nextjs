import React from "react";

interface IconProps {
    color?: string;
    size?: number | string;
    className?: string;
}

const MessageBubbleIcon: React.FC<IconProps> = ({
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
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
    );
};

export default MessageBubbleIcon;
