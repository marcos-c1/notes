
import { RxTextAlignJustify } from "react-icons/rx";
import { MdDarkMode } from "react-icons/md";
import { useContext, useState } from "react";
import { MdOutlineLightMode, MdClose } from "react-icons/md";
import logo from '../img/logo_2.png'
import { ThemeContext } from "./contexts/Theme";

import Login from "./Login";

const Menu = ({ isLogin }) => {
    const [login, setLogin] = useState(isLogin);
    const [colorScheme, setColorScheme] = useContext(ThemeContext);

    const iconSize = 20;

    function hideMenu(e) {
        const sidebar = document.getElementById("sidebar");
        const containerEditor = document.getElementById("container__editor");

        if (containerEditor.style.display == "none") {
            sidebar.style.display = "none";
            containerEditor.style.width = "100%";
            containerEditor.style.display = "block";
        } else {
            if (window.screen.width <= 700) {
                if (sidebar.style.display == "none") {
                    console.log('to aqui')
                    sidebar.style.display = "block";
                    sidebar.style.width = "100%";
                    sidebar.style.minHeight = "calc(100vh - 91px)";
                    containerEditor.style.display = "none";
                    containerEditor.style.width = "";
                } else {
                    sidebar.style.display = "none";
                    sidebar.style.width = "";
                    containerEditor.style.display = "block";
                    containerEditor.style.width = "100%";
                    containerEditor.style.minHeight = "calc(100vh - 91px)";
                }
            } else {
                if (sidebar?.style.display == "none") {
                    sidebar.style.display = "block";
                    sidebar.style.width = "";
                    containerEditor.style.width = "";
                } else {
                    sidebar.style.display = "none";
                    sidebar.style.width = "";
                    containerEditor.style.width = "100%";
                    containerEditor.style.display = "block";
                    containerEditor.style.minHeight = "calc(100vh - 91px)";
                }
            }

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
            <ul style={{ alignItems: "center", height: "50vh", padding: "20px 10px", overflow: "hidden" }}>
                <li className="icon" onClick={hideMenu}>
                    <RxTextAlignJustify size={25} id="menu" />
                </li>
                <li id="logo" style={{ margin: "0 auto" }}><img src={logo} width="70px" alt="Hey, I'm Marta!" /><span id="title">Notes</span></li>
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
        </div >
    )
}

export default Menu