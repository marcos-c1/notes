
import { RxTextAlignJustify } from "react-icons/rx";
import { MdDarkMode } from "react-icons/md";
import { useContext, useState } from "react";
import { MdOutlineLightMode, MdClose } from "react-icons/md";

import { ThemeContext } from "./contexts/Theme";

import Login from "./Login";

const Menu = ({ isLogin }) => {
    const [login, setLogin] = useState(isLogin);
    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    const iconSize = 20;

    function hideMenu(e) {
        const menu = document.getElementById("menu");
        const close = document.getElementById("close");
        const sidebar = document.getElementById("sidebar");
        const containerEditor = document.getElementById("containerEditor");

        if (menu?.style.display != "none") {
            sidebar.style.display = "none";
            containerEditor.style.width = "100%";
            menu.style.display = "none";
            close.style.display = "block";
        } else {
            sidebar.style.display = "block";
            containerEditor.style.width = "";
            menu.style.display = "block";
            close.style.display = "none";
        }
    }


    function loginModal() {
        showLoginMenu()
        return (<Login />)
    }

    function switchMode(e) {
        let html = document.querySelector("html");
        if (colorScheme == "dark") {
            html.style.color = "var(--font-color-light-mode)";
            html.style.backgroundColor = "var(--bg-primary-light-mode)";
            setColorScheme("light");
        } else {
            html.style.color = "var(--font-color-dark-mode)";
            html.style.backgroundColor = "var(--bg-primary-dark-mode)";
            setColorScheme("dark");
        }
    }

    function handleHideBlur(e) {
        let element = e.target;
        let login = document.getElementById("login");
        if (element.style.display == "block") {
            element.style.display = "none"
        }
        setLogin(!login);
    }

    function showLoginMenu() {
        let element = document.getElementById("blur");
        if (login) {
            element.style.display = "block";
        } else {
            element.style.display = "none"
        }
    }

    return (
        <div className="container__menu theme">
            <div id="blur" style={{ display: "none" }} onClick={handleHideBlur}>
            </div>
            <ul style={{ alignItems: "center" }}>
                <li className="icon" onClick={hideMenu}>
                    <RxTextAlignJustify size={25} id="menu" />
                    <MdClose size={25} style={{ display: "none" }} id="close" />
                </li>
                <li>Notes</li>
                <ul className="container__menu__right" >
                    <li className="icon icon__mode" id="btnTheme" onClick={switchMode}>
                        <ThemeContext.Provider value={colorScheme}>
                            {colorScheme == "dark" ?
                                <MdOutlineLightMode id="light-mode" size={iconSize} /> :
                                <MdDarkMode id="dark-mode" size={iconSize} />}
                        </ThemeContext.Provider>
                    </li>
                    <li>{isLogin ? <img src="./logo.svg" alt="logo" /> : <button onClick={() => setLogin(!login)} className="menu__login">Login</button>}</li>
                </ul>
                {
                    login ? loginModal() : null
                }
            </ul>
        </div>
    )
}

export default Menu