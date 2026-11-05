import { Mark, mergeAttributes, Node } from "@tiptap/core";
import { Markdown } from "@tiptap/markdown";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { createLowlight } from "lowlight";
import php from "highlight.js/lib/languages/php";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import python from "highlight.js/lib/languages/python";
import yaml from "highlight.js/lib/languages/yaml";
import java from "highlight.js/lib/languages/java";
import kotlin from "highlight.js/lib/languages/kotlin";
import ruby from "highlight.js/lib/languages/ruby";
import markdown from "highlight.js/lib/languages/markdown";
import diff from "highlight.js/lib/languages/diff";
import TiptapCodeBlock from "./TiptapCodeBlock";

const lowlight = createLowlight();
lowlight.register({
    php, javascript, js: javascript, typescript, ts: typescript,
    html: xml, xml, css, json, sql, bash, shell: bash,
    python, py: python, yaml, yml: yaml, java, kotlin, ruby,
    markdown, md: markdown, diff, patch: diff,
});

const allowedUrl = (value: string | null | undefined) => {
    if (!value) return null;
    try {
        const url = new URL(value);
        return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
    } catch {
        return null;
    }
};

const TiptapBlockquote = Node.create({
    name: "blockquote",
    group: "block",
    content: "block+",
    defining: true,
    addAttributes: () => ({
        type: {
            default: "error",
            parseHTML: (element: HTMLElement) => (
                element.getAttribute("data-type") ??
                element.className.match(/blockquote-(info|success|warning|error)/)?.[1] ??
                "error"
            ),
            renderHTML: (attributes: { type: string }) => ({
                "data-type": attributes.type,
                class: `blockquote-${attributes.type}`,
            }),
        },
    }),
    parseHTML: () => [{ tag: "blockquote" }],
    renderHTML: ({ HTMLAttributes }) => ["blockquote", mergeAttributes(HTMLAttributes), 0],
});

const TiptapVideo = Node.create({
    name: "video",
    group: "block",
    atom: true,
    addAttributes: () => ({
        src: {
            default: null,
            parseHTML: (element: HTMLElement) => allowedUrl(element.getAttribute("src")),
            renderHTML: (attributes: { src?: string | null }) => {
                const src = allowedUrl(attributes.src);
                return src ? { src } : {};
            },
        },
    }),
    parseHTML: () => [{ tag: "iframe[data-tiptap-video]" }],
    renderHTML: ({ HTMLAttributes }) => [
        "iframe",
        mergeAttributes(HTMLAttributes, {
            "data-tiptap-video": "true",
            class: "tiptap-video",
            frameborder: "0",
            allowfullscreen: "true",
            loading: "lazy",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        }),
    ],
});

const TiptapTextStyle = Mark.create({
    name: "textStyle",
    addAttributes: () => ({ color: { default: null }, backgroundColor: { default: null } }),
    parseHTML: () => [{ tag: "span[style]" }],
    renderHTML: ({ HTMLAttributes }) => ["span", mergeAttributes(HTMLAttributes), 0],
});

export const createReadOnlyTiptapExtensions = () => [
    StarterKit.configure({ blockquote: false, codeBlock: false, link: false, underline: false }),
    Markdown,
    Underline,
    Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
    }),
    Image.configure({ allowBase64: false, HTMLAttributes: { class: "max-w-full rounded-md" } }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({ nested: true }),
    TiptapCodeBlock.configure({ lowlight, defaultLanguage: "javascript" }),
    TiptapBlockquote,
    TiptapVideo,
    TiptapTextStyle,
];
