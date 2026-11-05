"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { TiptapEditorProps } from "../editor-types";
import { createReadOnlyTiptapExtensions } from "./readOnlyTiptapExtensions";

const TiptapEditor: React.FC<TiptapEditorProps> = ({
    content,
    contentFormat,
    colorClass,
}) => {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const extensions = useMemo(() => createReadOnlyTiptapExtensions(), []);
    const editor = useEditor({
        extensions,
        content,
        contentType: contentFormat,
        editable: false,
        immediatelyRender: false,
    });

    useEffect(() => {
        if (!editor || typeof content === "object") return;
        editor.commands.setContent(content, {
            contentType: contentFormat,
            emitUpdate: false,
        });
    }, [content, contentFormat, editor]);

    if (!editor) {
        return (
            <div className="h-20 w-full animate-pulse rounded-lg bg-base-200" />
        );
    }

    return (
        <div
            ref={editorContainerRef}
            className={`tiptap-editor w-full font-sans ${colorClass ?? "text-base-content"} tiptap-editor-read-only`}
        >
            <EditorContent editor={editor} className="tiptap-content" />
        </div>
    );
};

export default TiptapEditor;
