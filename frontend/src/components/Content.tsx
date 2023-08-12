import { useState, useContext, useEffect } from "react";
import { SelectedContext } from "./contexts/SelectedNote";
import { useDispatch, useSelector } from "react-redux";
import user from "../api/user";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Menu from "./Menu";

import { ContentContext } from "./contexts/Content";
import { LoginContext } from "./contexts/Login";
import { NotesContext } from "./contexts/NotesByUserContext";

const Content = () => {

    const [selectedNote, setSelectedNote] = useContext(SelectedContext);
    const [content, setContent] = useContext(ContentContext);
    const [notesByUser, setNotes] = useContext(NotesContext);
    const [newNoteName, setNewNoteName] = useState(null);
    const [login, setLogin] = useContext(LoginContext);
    const note = useSelector((state) => state.notes);
    const user = useSelector((state) => state.user);

    const noteStatus = useSelector(state => state.notes.loading);
    const hasError = useSelector(state => state.notes.error);
    const initialContent = useSelector(state => state.notes.content);

    return (
        <>
            <header>
                <Menu isLogin={login} />
            </header>
            <main className="container__main">
                <NotesContext.Provider value={[notesByUser, setNotes]}>
                    <Sidebar />
                </NotesContext.Provider>
                <div className="container__editor" id="container__editor">
                    {note.loading && user.loading ? <div className="sidebar__loading"><h2 style={{ textAlign: "center" }}>Log to your account on top right corner</h2></div> : null}
                    {!note.loading && note.error ? <div> Error.. {note.error}</div> : null}
                    {
                        note.notes.length > 0 ? (
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
