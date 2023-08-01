
import {RxTextAlignJustify} from "react-icons/rx";
import {MdDarkMode} from "react-icons/md";
const Menu = ({ isLogin }) => {
  return (
    <div className="container__menu theme">
        <ul>
            <li className="icon"><RxTextAlignJustify size={23}/></li>
            <li>Notes</li>
            <div>
                <ul className="container__menu__right">
                    <div className="backdrop__filter">
                        <li className="icon icon__mode"><MdDarkMode size={23}/></li>
                    </div>
                    <li>{ isLogin ? <img src="./logo.svg" alt="logo" /> : "Login"}</li>
                </ul>
            </div>
            
        </ul>
    </div>
  )
}

export default Menu