import MDEditor, { commands } from '@uiw/react-md-editor';
import { useCallback, useContext, useEffect, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { ThemeContext } from './contexts/Theme';
import { BiSave } from "react-icons/bi";
import { ContentContext } from './contexts/Content';
import { useDispatch, useSelector } from "react-redux";
import { updateNoteById } from '../redux/notes/noteSlice';

const Editor = ({ selectedNote }) => {
    const [text, setText] = useContext(ContentContext);
    const [colorScheme, setColorScheme] = useContext(ThemeContext);
	const [savedState, setSavedState] = useState("Saved!");
    const dispatch = useDispatch();
    const note = useSelector((state) => state.notes);

    const editor = document.querySelector(".w-md-editor-text-input");
	const saved = document.getElementById("wasSaved");

	var timer;
	var delayTimer = 1000;

	const keyPress = useCallback((e) => {
		clearTimeout(timer);
		if(e.target.value){
			timer = setTimeout(() => {
				saveNote(e.target.value);
			}, delayTimer);
		}
	});

    useEffect(() => {
	 editor?.addEventListener('change', keyPress);
	 return () => editor?.removeEventListener("change", keyPress);
    }, [keyPress]);

    async function saveNote(value) {
        let newNote = {
            id: note.notes[selectedNote]._id,
            title: note.notes[selectedNote].title,
            content: value
        }
        await dispatch(updateNoteById(newNote)).unwrap();
    }

    return (
        <div id="containerEditor" data-color-mode={colorScheme}>
            <MDEditor
                className="editor"
                id="editor"
                preview="edit"
                value={text}
                onChange={(e) => {setText(e); setSavedState("Not saved *");}}
                commands={[
                    ...commands.getCommands(),
                    commands.group([], {
                        name: "update",
                        groupName: "update",
                        icon: (
						<div className="save__icon">
                           <BiSave size={15} id="icon__save"/> 
						   <small style={{paddingLeft: "5px"}} id="wasSaved">{savedState}</small>
						</div>
                        ),
                        children: (handle: any) => {
                            return (
                                <div style={{ width: 120, padding: 10 }}>
                                    <div>My Custom Toolbar</div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            console.log("> execute: >>>>>", handle.getState!())
                                        }
                                    >
                                        State
                                    </button>
                                    <button type="button" onClick={() => handle.close()}>
                                        Close
                                    </button>
                                    <button type="button" onClick={() => handle.execute()}>
                                        Execute
                                    </button>
                                </div>
                            );
                        },
                    })
                ]}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    )
}

export default Editor;
