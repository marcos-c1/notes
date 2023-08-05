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

    var typingTimer;                // timer identifier
    var doneTypingInterval = 5000;  // time in ms (5 seconds)

    function changeText(e) {
        setText(e.target.value || "");
        //await dispatch()
    }

    function checkTyping(e) {
        if (e.target.value) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    }

    function doneTyping() {
        console.log(text);
    }

    return (
        <div id="containerEditor" data-color-mode={colorScheme}>
            <MDEditor
                className="editor"
                id="editor"
                value={text}
                preview="edit"
                onChange={(val?: string) => setText(val || "")}
                onKeyUp={checkTyping}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    )
}

export default Editor;