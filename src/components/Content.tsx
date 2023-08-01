import MDEditor from '@uiw/react-md-editor';
import { useContext, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { ThemeContext } from './contexts/Theme';

const Content = ({ }) => {
    const [text, setText] = useState("");
    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    return (
        <div className="container__editor" data-color-mode={colorScheme}>
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

export default Content;