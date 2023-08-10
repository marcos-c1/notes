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
            <h3 style={{ textAlign: "center", marginBottom: "15px", overflow: "hidden" }}>Login</h3>
            <form action="" onSubmit={handleSubmit} method="post">
                <input type="text" placeholder="Username" id="username"></input>
                <input type="password" placeholder="Password" id="password"></input>
                <button id="btnLogin">Enter</button>
            </form>
            <small id="signUp" style={{ marginTop: "1em", marginLeft: "1em" }}><Link to="/signup" style={{ textDecoration: "none", font: "inherit", fontSize: "1em", color: "#f7f7f7" }}>Doesn't have an account?</Link></small>
        </div>
    )
}

export default Login
