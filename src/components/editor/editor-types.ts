import type { JSONContent } from "@tiptap/core";

export type EditorType = "rich_text" | "markdown" | "tiptap" | (string & {});

export type EditorContentFormat = "markdown" | "html" | "json";

export type AppEditorProps = {
    content?: string | null;
    editorType?: EditorType;
    colorClass?: string;
};

export type TiptapEditorProps = {
    content: string | JSONContent;
    contentFormat: EditorContentFormat;
    colorClass?: string;
    dns?: string;
};

