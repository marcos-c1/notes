import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { FiTrash } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";


const SideBar = () => {
    const allNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];
    const [notes, setNotes] = useState(allNotes);
    
    function handleSearch(e) {
        let value = e.target.value.toLowerCase().trim()
        if(value){
            let filter = allNotes.filter((note) => note.toLowerCase().includes(value))
            console.log(filter)
            if(filter.length > 0)
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

        for(let i = 0; i < notes.length; i++){
            if(notes[i].ariaLabel == element.ariaLabel){
                classList.add("checked");
            } else {
                if(notes[i].classList.contains("checked"))
                    notes[i].classList.remove("checked");
            }
        }
    }

  return (
    <div className="container__sidebar theme">
        <div className="sidebar__searchbar">
            <input type="text" id="searchbar" onChange={handleSearch}></input>
            <div className="searchbar__filter">
                <span className="icon icon__mode"><BsSearch size={15} /></span>
                
            </div>
            <div className="searchbar__filter">
                <span className="icon icon__mode" id="addBtn" onClick={handleClickAddBtn}><IoAddOutline/></span>
            </div>
        </div>
        <ul className="sidebar__notes">
            {
                notes.map((item: String, index: number) => {
                    return (
                        <div className="flex__row sidebar__note">
                            <li aria-label={index.toString()} key={index} onClick={handleClickNote}>{item}</li>
                            <div className="sidebar__notes__icon">
                                <CiMenuKebab />
                            </div>
                        </div>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default SideBar