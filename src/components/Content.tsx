import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

const Content = () => {
    const [text, setText] = useState("");
    return (
        <div className="container__editor" data-color-mode="dark">
            <MDEditor
                className="editor"
                value={text}
                preview="edit"
                onChange={(val?: string) => setText(val || "")}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    )
}

export default Content