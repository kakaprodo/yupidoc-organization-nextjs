import React from "react";
import { IconProps } from "../../types/common-types";

const LevelIcon: React.FC<IconProps> = ({
    color = "text-gray-500",
    size = "6",
    className = "",
    ...props
}) => {
    const computedClass = `h-${size} w-${size} ${color} ${className}`;

    return (
        <svg
            {...props}
            className={computedClass}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 21v-6" />
            <path d="M12 21V9" />
            <path d="M19 21V3" />
        </svg>
    );
};

export default LevelIcon;
