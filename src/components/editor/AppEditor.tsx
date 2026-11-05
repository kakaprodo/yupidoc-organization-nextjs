"use client";

import dynamic from "next/dynamic";
import type { AppEditorProps, EditorContentFormat } from "./editor-types";

const TiptapEditor = dynamic(() => import("./editor-types/TiptapEditor"), {
    ssr: false,
    loading: () => (
        <div className="h-20 w-full animate-pulse rounded-lg bg-base-200" />
    ),
});

type DetectedContentFormat = "html" | "markdown" | "text" | "unknown";

export function detectContentFormat(content: string): DetectedContentFormat {
    if (!content.trim()) {
        return "html";
    }

    const value = content.trim();

    const htmlPattern = /<\/?[a-z][\s\S]*?>/i;

    if (htmlPattern.test(value)) {
        return "html";
    }

    const markdownPatterns = [
        /^#{1,6}\s+.+/m,
        /^\s*[-*+]\s+.+/m,
        /^\s*\d+\.\s+.+/m,
        /\*\*.+?\*\*/,
        /(?<!\*)\*[^*\n]+\*(?!\*)/,
        /`[^`]+`/,
        /^\s*```/m,
        /^\s*>\s+.+/m,
        /\[.+?\]\(.+?\)/,
        /^\s*\|.+\|$/m,
    ];

    if (markdownPatterns.some((pattern) => pattern.test(value))) {
        return "markdown";
    }

    return "text";
}

export const AppEditor = ({ content, colorClass }: AppEditorProps) => {
    const rawContent = content ?? "";
    const detectedFormat = detectContentFormat(rawContent);
    const contentFormat: EditorContentFormat =
        detectedFormat === "markdown" ? detectedFormat : "html";

    return (
        <TiptapEditor
            content={rawContent}
            contentFormat={contentFormat}
            colorClass={colorClass}
        />
    );
};
