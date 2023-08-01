import { useEffect, useState } from "react";
import { BsSearch, BsTrash, BsDownload } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { FiTrash } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";


const SideBar = () => {
    const allNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];
    const [notes, setNotes] = useState(allNotes);

    document.addEventListener('click', (e: Event) => {
        let submenu = document.querySelector(".sidebar__menu");
        if (!submenu?.contains(e.target) && e.target.id != "menu_icon" && !e.target.classList.contains("in") && !e.target.classList.contains("sidebar__context__menu")) {
            submenu?.classList.add("hidden");
        }
    });

    function handleSearch(e) {
        let value = e.target.value.toLowerCase().trim()
        if (value) {
            let filter = allNotes.filter((note) => note.toLowerCase().includes(value))
            if (filter.length > 0)
                setNotes(filter)
            else
                setNotes(allNotes)
        } else {
            setNotes(allNotes)
        }
    }

    function handleClickAddBtn() {
        let size = notes.length + 1;
        setNotes([...notes, `Note ${size.toString()}`])
    }

    function handleClickNote(e) {
        let notes = document.querySelectorAll(".sidebar__note");
        let element = e.target;
        let classList = element.classList;

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].ariaLabel == element.ariaLabel) {
                classList.add("checked");
            } else {
                if (notes[i].classList.contains("checked"))
                    notes[i].classList.remove("checked");
            }
        }
    }

    function handleSubMenuIcon(e) {
        let submenu = document.querySelector(".sidebar__menu");
        let sub = document.getElementById("submenu");
        sub.style.objectPosition = `${e.clientX - 50}px ${e.clientY}px`;
        if (submenu?.classList.contains("hidden")) {
            submenu.classList.remove("hidden");
        } else {
            submenu.classList.add("hidden");
        }
    }

    return (
        <div className="container__sidebar theme" id="sidebar">
            <div className="sidebar__searchbar">
                <input type="text" id="searchbar" onChange={handleSearch}></input>
                <div className="searchbar__filter">
                    <span className="icon icon__mode"><BsSearch size={15} /></span>
                </div>
                <div className="searchbar__filter">
                    <span className="icon icon__mode" id="addBtn" onClick={handleClickAddBtn}><IoAddOutline /></span>
                </div>
            </div>
            <ul className="sidebar__notes">
                {
                    notes.map((item: String, index: number) => {
                        return (
                            <div className="flex__row sidebar__note"
                                onMouseOver={(e) => e.target.classList.add("in")}
                                onMouseLeave={(e) => e.target.classList.remove("in")}
                                aria-label={index.toString()}
                                onClick={handleClickNote}>
                                <li key={index}>{item}</li>
                                <div className="sidebar__notes__icon" onClick={handleSubMenuIcon} >
                                    <CiMenuKebab id="menu_icon" />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="sidebar__context__menu" >
                    <div className="sidebar__menu hidden" id="submenu">
                        <ul className="sidebar__menu__list">
                            <li className="sidebar__menu__item"><button className="sidebar__menu__button"><MdOutlineDriveFileRenameOutline fill={"gray"} />Rename</button></li>
                            <li className="sidebar__menu__item"><button className="sidebar__menu__button sidebar__menu__button--delete"><BsTrash fill={"gray"} />Delete</button></li>
                            <li className="sidebar__menu__item"><button className="sidebar__menu__button"><BsDownload fill={"gray"} />Download</button></li>
                        </ul>
                    </div>
                </div>
            </ul>

        </div>
    )
}

export default SideBar