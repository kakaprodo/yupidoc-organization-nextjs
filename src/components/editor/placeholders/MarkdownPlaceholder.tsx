
import { marked } from "marked";

type MarkdownPlaceholderProps = {
    content: string;
};

export const MarkdownPlaceholder: React.FC<MarkdownPlaceholderProps> = ({
    content
}) => {
    const myContent = marked.parse(content) as string;
    return (
        <div className="w-full contents-editor contents-editor-read-only">
            <div
                className="editor-preview editor-preview-active"
                dangerouslySetInnerHTML={{ __html: myContent }}
            />
        </div>
    );
};
