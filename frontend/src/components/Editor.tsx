import MDEditor from '@uiw/react-md-editor';
import { useContext, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { ThemeContext } from './contexts/Theme';

const Editor = ({ content }) => {
    const [text, setText] = useState("");
    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    return (
        <div id="containerEditor" data-color-mode={colorScheme}>
            <MDEditor
                className="editor"
                id="editor"
                value={content}
                preview="edit"
                onChange={(val?: string) => setText(val || "")}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    )
}

export default Editor;