import React from "react";

interface SearchIconProps {
    size?: string;  // Tailwind size class (e.g., "5" for h-5 w-5)
    color?: string; // Tailwind text color (e.g., "text-gray-500")
    tw?: string;    // Additional Tailwind classes
}

const SearchIcon: React.FC<SearchIconProps> = ({
    size = "5",
    color = "text-gray-500",
    tw = "",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${tw} h-${size} w-${size} ${color}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
};

export default SearchIcon;
