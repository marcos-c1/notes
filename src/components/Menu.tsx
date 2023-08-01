
import { RxTextAlignJustify } from "react-icons/rx";
import { MdDarkMode } from "react-icons/md";
import { useContext, useState } from "react";
import { VscGithub } from "react-icons/vsc";
import { MdOutlineLightMode } from "react-icons/md";

import { ThemeContext } from "./contexts/Theme";

const Menu = ({ isLogin, theme }) => {
    const [login, setLogin] = useState(false);
    const [colorScheme, setColorScheme] = useState(theme);

    function loginModal() {
        showLoginMenu()
        return (
            <div className="container__login" id="login">
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <small>Doesn't have an account?</small>
                <ul className="login__link">
                    <li>Google</li>
                    <li><VscGithub /></li>
                </ul>
            </div>
        )
    }

    function switchMode(e) {
        let html = document.querySelector("html");
        if (colorScheme == "black") {
            html.style.color = "var(--font-color-white-mode)";
            html.style.backgroundColor = "var(--bg-primary-white-mode)";
            setColorScheme("white");
        } else {
            html.style.color = "var(--font-color-dark-mode)";
            html.style.backgroundColor = "var(--bg-primary-dark-mode)";
            setColorScheme("black");
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
                <li className="icon"><RxTextAlignJustify size={20} /></li>
                <li>Notes</li>
                <ul className="container__menu__right" >
                    <li className="icon icon__mode" onClick={switchMode}>
                        <ThemeContext.Provider value={colorScheme}>
                            {colorScheme == "black" ?
                                <MdOutlineLightMode id="white-mode" size={20} /> :
                                <MdDarkMode id="dark-mode" size={20} />}
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