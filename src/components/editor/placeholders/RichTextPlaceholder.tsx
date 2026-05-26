"use client"

type RichTextPlaceholderProps = {
    content: string;
    barParent?: string;
};

export const RichTextPlaceholder: React.FC<RichTextPlaceholderProps> = ({
    content,
    barParent = 'content',
}) => {
    // useEffect(() => {
    //     if (!containerRef.current) return;

    //     // Highlight Quill code blocks
    //     containerRef.current.querySelectorAll<HTMLDivElement>(".ql-code-block, :not(.hljs)").forEach((block) => {
    //         const language = block.dataset.language || "plaintext";
    //         block.classList.add(`language-${language}`);
    //         hljs.highlightElement(block);
    //     });

    // }, []);

    return (
        <div className={`text-editor-content ql-container ql-snow ql-disabled bg-transparent! w-full ${barParent}`} >
            <div
                className="ql-editor" contentEditable={false}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};
