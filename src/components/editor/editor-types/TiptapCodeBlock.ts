import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import ReadOnlyCodeBlockView from "./tiptap-partials/ReadOnlyCodeBlockView";

const TiptapCodeBlock = CodeBlockLowlight.extend({
    addNodeView() {
        return ReactNodeViewRenderer(ReadOnlyCodeBlockView);
    },
});

export default TiptapCodeBlock;
