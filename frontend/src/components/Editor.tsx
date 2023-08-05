import MDEditor from '@uiw/react-md-editor';
import { useContext, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { ThemeContext } from './contexts/Theme';

import { ContentContext } from './contexts/Content';
import { useDispatch, useSelector } from "react-redux";

const Editor = ({ content }) => {
    const [text, setText] = useContext(ContentContext);
    const [colorScheme, setColorScheme] = useContext(ThemeContext);
    const dispatch = useDispatch();
    const note = useSelector((state) => state.notes);

    function changeText(e) {
        setText(e.target.value || "");
        //await dispatch()
    }

    return (
        <div id="containerEditor" data-color-mode={colorScheme}>
            <MDEditor
                className="editor"
                id="editor"
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

export default Editor;