import { VscGithub } from "react-icons/vsc";
import { SiGmail } from "react-icons/si";
import { useState, useContext } from "react";
import { ThemeContext } from "../components/contexts/Theme.tsx"

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [theme, setTheme] = useContext(ThemeContext);

    function handleSubmit(e) {
        e.preventDefault();
        let element = e.target;
        setUsername(element[0].value);
        setUsername(element[1].value);

        element[0].value = ""
        element[1].value = ""

    }

    return (
        <div className="container__login white_font" id="login">
            <div className="container__login" id="login">
                <h3 style={{ textAlign: "center", marginBottom: "15px", overflow: "hidden" }}>Log in</h3>
                <form action="" onSubmit={handleSubmit} method="post">
                    <input type="text" placeholder="Username" id="username"></input>
                    <input type="password" placeholder="Password" id="password"></input>
                    <button style={{ display: "none" }}></button>
                </form>
                <small><Link to="/signup">Doesn't have an account?</Link></small>
                <ul className="login__link">
                    <small>Or sign with </small>
                    <li className="flex__column">
                        <SiGmail size={25} /><span>gmail</span>
                    </li>
                    <li className="flex__column">
                        <VscGithub size={25} />
                        <span>github</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Login
