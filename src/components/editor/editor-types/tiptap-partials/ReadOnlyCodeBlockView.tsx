"use client";

import React, { useState } from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { copyToClipboard } from "@/utils/shared-helpers";
import ValidIcon from "@/components/Icons/ValidIcon";
import CopyIcon from "@/components/Icons/CopyIcon";

type ReadOnlyCodeBlockViewProps = {
    node: { textContent: string };
};

const ReadOnlyCodeBlockView: React.FC<ReadOnlyCodeBlockViewProps> = ({
    node,
}) => {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        if (!navigator.clipboard) return;

        copyToClipboard(node.textContent);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };

    return (
        <NodeViewWrapper
            as="pre"
            className="tiptap-code-block relative block w-full min-w-0 rounded-md bg-neutral text-neutral-content"
        >
            <button
                type="button"
                title={copied ? "Copied" : "Copy code"}
                aria-label={copied ? "Copied" : "Copy code"}
                className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs"
                onClick={copyCode}
            >
                {copied ? (
                    <ValidIcon color="" size={4} />
                ) : (
                    <CopyIcon color="" size={4} />
                )}
            </button>
            <div className="min-w-0 max-w-full overflow-x-auto p-4 pr-20">
                <NodeViewContent
                    as={"code" as never}
                    className="block min-h-6 min-w-max whitespace-pre bg-transparent p-0 text-inherit"
                />
            </div>
        </NodeViewWrapper>
    );
};

export default ReadOnlyCodeBlockView;
