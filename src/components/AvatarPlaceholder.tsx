'use client';

import { User } from "@/types/general-type";
import { avatarLetter, isValidUrl } from "@/utils/shared-helpers";
import React from "react";

interface AvatarPlaceholderProps {
    color?: string;       // Tailwind background color class
    name: string;        // Name to extract first letter
    rounded?: string;     // Tailwind rounding class
    width?: string;       // Tailwind width class
    user?: User | null;
    size?: string
}

const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
    color = "bg-gray-800",
    name = "Y",
    rounded = "rounded-full",
    width = "",
    user,
    size = 'w-8 lg:w-10'

}) => {
    const avatarUrl = user?.avatar || undefined;
    const [showImg, setShowImg] = React.useState(true);

    return (avatarUrl && showImg && isValidUrl(avatarUrl)) ? (
        <div className="avatar">
            <div className={` ${rounded} ${size} ${width} `}>
                <img src={avatarUrl} alt="member-img" onError={() => setShowImg(false)} />
            </div>
        </div>
    ) : (
        <div className="avatar placeholder">
            <div
                className={`${color} dark:bg-base-300 text-neutral-content ${rounded}  ${size} ${width} flex items-center justify-center border-base-300 dark:border-gray-600`}
            >
                <span>{avatarLetter(name)}</span>
            </div>
        </div>
    );
};

export default AvatarPlaceholder;
