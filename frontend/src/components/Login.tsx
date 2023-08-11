import { VscGithub } from "react-icons/vsc";
import { SiGmail, SiWorldhealthorganization } from "react-icons/si";
import { useState, useContext } from "react";
import { authUser } from "../redux/notes/userSlice.ts";
import { ThemeContext } from "../components/contexts/Theme.tsx"
import logo from "../img/logo_2.png"
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginContext } from "./contexts/Login.tsx";

const Login = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useContext(LoginContext);
    const [hasUsername, setHasUsername] = useState(false);
    const [hasPass, setHasPass] = useState(false);
    const [theme, setTheme] = useContext(ThemeContext);

    async function handleSubmit(e) {
        e.preventDefault();
        let element = e.target;

        const username = element[0]?.value;
        const pass = element[1]?.value;
        if (!username) {
            setHasUsername(false);
        } else if (!pass) {
            setHasPass(false);
        } else {
            setHasUsername(true);
            setHasPass(true);

            const payload = {
                username: username,
                password: pass
            }
            await dispatch(authUser(payload)).unwrap();
            setLogin(false);
        }
        element[0].value = ""
        element[1].value = ""
    }

    return (
        <div className="container__login white_font" id="login">
            <img style={{ alignSelf: "center", overflow: "hidden" }} src={logo} width="70px" alt="Hey, I'm Marta!" /><span style={{ textAlign: "center", marginBottom: "0.5em" }} id="title">Notes</span>
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
