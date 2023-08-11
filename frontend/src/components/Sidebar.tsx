import { BsSearch } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsTrash, BsDownload } from "react-icons/bs";
import { SelectedContext } from "./contexts/SelectedNote";
import { CiMenuKebab } from "react-icons/ci";
import { ContentContext } from "./contexts/Content";
import { addNewNote, deleteNoteById, updateNoteById } from "../redux/notes/noteSlice";
import { AsyncThunkAction } from "@reduxjs/toolkit";

const Sidebar = () => {
    const submenu = document.querySelector(".sidebar__menu");
    const dispatch = useDispatch();
    const [selectedNote, setSelectedNote] = useContext(SelectedContext);
    const [content, setContent] = useContext(ContentContext);

    const note = useSelector((state) => state.notes);

    document.addEventListener('click', (e: Event) => {
        if (!submenu?.contains(e.target) && e.target.id != "menu_icon" && !e.target.classList.contains("in") && !e.target.classList.contains("sidebar__context__menu")) {
            hideSubmenu();
        }
    });

    function hideSubmenu() {
        submenu?.classList.add("hidden");
    }


    function searchNote(e) {
        let value = e.target.value.toLowerCase().trim()
        if (value) {
            let filter = note.notes.filter((note) => note.toLowerCase().includes(value))
            if (filter.length > 0)
                setNotes(filter)
            else
                setNotes(allNotes)
        } else {
            setNotes(allNotes)
        }
    }

    async function addNote() {
        let size = note.notes.length + 1;
        let newNote = {
            title: `Note ${size.toString()}`,
            content: ''
        }
        //setNotes([...notes,])
        await dispatch(addNewNote(newNote)).unwrap();
    }


    function handleClickNote(e) {
        let notes = document.querySelectorAll(".sidebar__note");
        let element = e.target;
        let classList = element.classList;

        setSelectedNote(element.ariaLabel);
        setContent(note.notes[element.ariaLabel].content);

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].ariaLabel == element.ariaLabel) {
                notes[i].classList.add("checked");
            } else {
                if (notes[i].classList.contains("checked"))
                    notes[i].classList.remove("checked");
            }
        }
    }

    function createInput(element: HTMLElement | null) {
        const input = document.createElement('input');
        const nodeNote = element;
        input.type = "text";
        input.id = "renameNote";

        element?.replaceWith(input);
        console.log(note);
        input.addEventListener('change', async (e) => {
            nodeNote.innerHTML = `${e.target.value}`;
            let newNote = {
                id: note.notes[selectedNote]._id,
                title: nodeNote.innerHTML,
                content: note.notes[selectedNote].content
            }
            console.log(newNote)
            await dispatch(updateNoteById(newNote)).unwrap();
            input.replaceWith(nodeNote);
        });
    }

    function openSubMenu(e) {
        // Get current note value
        setSelectedNote(e.target.ariaLabel);

        let submenu = document.querySelector(".sidebar__menu");
        let sub = document.getElementById("submenu");
        sub.style.top = `${e.clientY}px`;
        sub.style.right = `${e.clientX + 280}px`;

        if (submenu?.classList.contains("hidden")) {
            submenu.classList.remove("hidden");
        } else {
            submenu?.classList.add("hidden");
        }
    }

    function renameNote() {
        if (selectedNote != undefined || selectedNote != null) {
            const element = document.getElementById(`note${selectedNote}`);
            createInput(element);
        }
        hideSubmenu()
    }

    function deleteNote() {
        if (selectedNote != undefined || selectedNote != null) {
            const index = selectedNote;
            setSelectedNote(index - 1);
            dispatch(deleteNoteById(note.notes[index]._id)).unwrap();
        }
        hideSubmenu()
    }

    return (
        <div className="container__sidebar theme" id="sidebar">
            <div className="main__notes" id="main">
                <ul className="sidebar__notes">
                    <div className="sidebar__searchbar">
                        <input type="text" id="searchbar" onChange={searchNote}></input>
                        <div className="searchbar__filter">
                            <span className="icon icon__mode" id="filterBtn"><BsSearch size={15} /></span>
                        </div>
                        <div className="searchbar__filter">
                            <span className="icon icon__mode" id="addBtn" onClick={addNote}><IoAddOutline /></span>
                        </div>
                    </div>
                    {note.loading && <div className="sidebar__loading"><h2 style={{ textAlign: "center" }}>Loading...</h2></div>}
                    {!note.loading && note.error ? <div>Error.. {note.error}</div> : null}
                    {!note.loading && note.notes.length ? (
                        note.notes.map((item: Object, index: number) => {
                            if (index == selectedNote) {
                                return (
                                    <div className="flex__row sidebar__note checked"
                                        onMouseOver={(e) => e.target.classList.add("in")}
                                        onMouseLeave={(e) => e.target.classList.remove("in")}
                                        aria-label={index.toString()}
                                        onClick={handleClickNote} key={index}>
                                        <li key={index} id={`note${index.toString()}`}>{item.title}</li>
                                        <div className="sidebar__notes__icon" aria-label={index.toString()} onClick={openSubMenu} >
                                            <CiMenuKebab aria-label={index.toString()} id="menu_icon" />
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="flex__row sidebar__note"
                                        onMouseOver={(e) => e.target.classList.add("in")}
                                        onMouseLeave={(e) => e.target.classList.remove("in")}
                                        aria-label={index.toString()}
                                        onClick={handleClickNote} key={index}>
                                        <li key={index} id={`note${index.toString()}`}>{item.title}</li>
                                        <div className="sidebar__notes__icon" aria-label={index.toString()} onClick={openSubMenu} >
                                            <CiMenuKebab aria-label={index.toString()} id="menu_icon" />
                                        </div>
                                    </div>
                                )
                            }

                        })
                    ) : null}
                    <div className="sidebar__context__menu" id="submenu">
                        <div className="sidebar__menu hidden" >
                            <ul className="sidebar__menu__list">
                                <li className="sidebar__menu__item"><button className="sidebar__menu__button" onClick={renameNote}><MdOutlineDriveFileRenameOutline fill={"gray"} />Rename</button></li>
                                <li className="sidebar__menu__item"><button className="sidebar__menu__button sidebar__menu__button--delete" onClick={deleteNote}><BsTrash fill={"gray"} />Delete</button></li>
                                <li className="sidebar__menu__item"><button className="sidebar__menu__button"><BsDownload fill={"gray"} />Download</button></li>
                            </ul>
                        </div>
                    </div>
                </ul>
            </div >
        </div >
    )
}

export default Sidebar;