import { useState, useContext, useEffect } from "react";
import { SelectedContext } from "./contexts/SelectedNote";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNewNote, deleteNoteById, updateNoteById } from "../redux/notes/noteSlice";
import user from "../api/user";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Menu from "./Menu";

import { ContentContext } from "./contexts/Content";
import { LoginContext } from "./contexts/Login";

const Content = () => {

    const [selectedNote, setSelectedNote] = useContext(SelectedContext);
    const [content, setContent] = useContext(ContentContext);
    const [newNoteName, setNewNoteName] = useState(null);
    const [login, setLogin] = useContext(LoginContext);
    const dispatch = useDispatch();
    const note = useSelector((state) => state.notes);
    const noteStatus = useSelector(state => state.notes.loading);
    const hasError = useSelector(state => state.notes.error);
    const initialContent = useSelector(state => state.notes.content);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return (
        <>
            <header>
                <Menu isLogin={login} />
            </header>
            <main className="container__main">
                <Sidebar />
                <div className="container__editor">
                    {note.loading && <div className="sidebar__loading"><h2 style={{ textAlign: "center" }}>Loading...</h2></div>}
                    {!note.loading && note.error ? <div> Error.. {note.error}</div> : null}
                    {
                        !note.loading && note.notes.length ? (
                            <div className="container__editor">
                                <ContentContext.Provider value={[content, setContent]}>
                                    <Editor selectedNote={selectedNote} />
                                </ContentContext.Provider>
                            </div>
                        ) : null
                    }
                </div>
            </main>
        </>

    )
}

export default Content
