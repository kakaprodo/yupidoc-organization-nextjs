


import { EDITOR_TYPE } from "@/types/general-type";
import { MarkdownPlaceholder } from "./placeholders/MarkdownPlaceholder";
import { RichTextPlaceholder } from "./placeholders/RichTextPlaceholder";
import "quill/dist/quill.snow.css";


type AppEditorProps = {
    content: string;
    editorType: EDITOR_TYPE;
    colorClass?: string
}

export const AppEditor: React.FC<AppEditorProps> = ({
    content,
    editorType = 'rich_text',
}: AppEditorProps) => {

    return ((editorType == 'markdown')
        ? <MarkdownPlaceholder content={content} />
        : <RichTextPlaceholder content={content} />
    )

}