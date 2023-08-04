import { useState, useContext } from "react";
import { BsSearch, BsTrash, BsDownload } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { NotesContext } from "./contexts/Notes";

const SideBar = () => {
    const submenu = document.querySelector(".sidebar__menu");
    const [notes, setNotes] = useContext(NotesContext);
    const [selectedNote, setSelectedNote] = useState(-1);
    const [newNoteName, setNewNoteName] = useState(null);


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
            let filter = allNotes.filter((note) => note.toLowerCase().includes(value))
            console.log(allNotes)
            if (filter.length > 0)
                setNotes(filter)
            else
                setNotes(allNotes)
        } else {
            setNotes(allNotes)
        }
    }

    function addNote() {
        let size = notes.length + 1;
        setNotes([...notes, `Note ${size.toString()}`])
    }

    function handleClickNote(e) {
        let notes = document.querySelectorAll(".sidebar__note");
        let element = e.target;
        let classList = element.classList;

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
        const note = element;
        input.type = "text";
        input.id = "renameNote";

        element?.replaceWith(input);

        input.addEventListener('change', (e) => {
            note.innerHTML = `${e.target.value}`;
            notes[selectedNote] = `${e.target.value}`;
            input.replaceWith(note);
        });
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
            const newNotes = notes.filter((_, index) => index != selectedNote)
            setNotes(newNotes)
        }
        hideSubmenu()
    }

    function openSubMenu(e) {
        // Get current note value
        setSelectedNote(e.target.ariaLabel);

        let submenu = document.querySelector(".sidebar__menu");
        let sub = document.getElementById("submenu");
        sub.style.top = `${e.clientY}px`;
        sub.style.right = `${e.clientX + 100}px`;

        if (submenu?.classList.contains("hidden")) {
            submenu.classList.remove("hidden");
        } else {
            submenu.classList.add("hidden");
        }
    }

    return (
        <div className="container__sidebar theme" id="sidebar">
            <div className="sidebar__searchbar">
                <input type="text" id="searchbar" onChange={searchNote}></input>
                <div className="searchbar__filter">
                    <span className="icon icon__mode" id="filterBtn"><BsSearch size={15} /></span>
                </div>
                <div className="searchbar__filter">
                    <span className="icon icon__mode" id="addBtn" onClick={addNote}><IoAddOutline /></span>
                </div>
            </div>
            <ul className="sidebar__notes">
                {
                    notes.map((item: String, index: number) => {
                        if (index == 0) {
                            return (
                                <div className="flex__row sidebar__note checked"
                                    onMouseOver={(e) => e.target.classList.add("in")}
                                    onMouseLeave={(e) => e.target.classList.remove("in")}
                                    aria-label={index.toString()}
                                    onClick={handleClickNote}>
                                    <li key={index} id={`note${index.toString()}`}>{item}</li>
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
                                    onClick={handleClickNote}>
                                    <li key={index} id={`note${index.toString()}`}>{item}</li>
                                    <div className="sidebar__notes__icon" aria-label={index.toString()} onClick={openSubMenu} >
                                        <CiMenuKebab aria-label={index.toString()} id="menu_icon" />
                                    </div>
                                </div>
                            )
                        }

                    })
                }
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

        </div>
    )
}

export default SideBar