'use client';

import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";



export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // On utilise requestAnimationFrame pour sortir de la boucle de rendu synchrone
        const raf = requestAnimationFrame(() => {
            startTransition(() => {
                setMounted(true);
            });
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    if (!mounted) {
        return <div className="p-2 h-8 w-8" aria-hidden="true" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
                <MoonIcon className="h-5 w-5 text-slate-700" />
            )}
        </button>
    );
}