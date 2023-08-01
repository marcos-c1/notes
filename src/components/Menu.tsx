
import {RxTextAlignJustify} from "react-icons/rx";
import {MdDarkMode} from "react-icons/md";
import { useState } from "react";

const Menu = ({ isLogin }) => {
    const [login, setLogin] = useState(false);
    
    function loginModal() {
        showLoginMenu()
        return (
            <div className="container__login" id="login">
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <small>Não tem cadastro?</small>
                <ul className="login__link">
                    <li>Google</li>
                    <li>Github</li>
                </ul>
            </div>
        )
    }
    
    function handleHideBlur(e) {
        let element = e.target;
        let login = document.getElementById("login");
        console.log(element);
        if(element.style.display == "block"){
            element.style.display = "none"
        }
        setLogin(!login);
    }

    function showLoginMenu() {
        let element = document.getElementById("blur");
        if(login) {
            element.style.display = "block";
        } else {
            element.style.display = "none"
        }
    }

  return (
    <div className="container__menu theme">
        <div id="blur" style={{display: "none"}} onClick={handleHideBlur}>
        </div>
        <ul style={{alignItems: "center"}}>
            <li className="icon"><RxTextAlignJustify size={20}/></li>
            <li>Notes</li>
            <div>
                <ul className="container__menu__right">
                    <div className="backdrop__filter">
                        <li className="icon icon__mode"><MdDarkMode size={20}/></li>
                    </div>
                    <li>{ isLogin ? <img src="./logo.svg" alt="logo" /> : <button onClick={() => setLogin(!login)} className="menu__login">Login</button>}</li>
                </ul>
            </div>
            {
                login ? loginModal() : null
            }
        </ul>
    </div>
  )
}

export default Menu