import { useState, useContext, useEffect } from "react";
import { authUser } from "../redux/notes/userSlice.ts";
import { ThemeContext } from "../components/contexts/Theme.tsx"
import logo from "../img/logo_2.png"
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from "./contexts/Login.tsx";
import Loading from "./Loading.tsx";
import { DisconnectContext } from "./contexts/Disconnect.tsx";
import { handleErrorService } from "../utils/errorHandler.tsx";

const Login = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useContext(LoginContext);
    const [hasUsername, setHasUsername] = useState(true);
    const [hasPass, setHasPass] = useState(true);
    const [theme, setTheme] = useContext(ThemeContext);
    const [disconnect, setDisconnect] = useContext(DisconnectContext);
    const user = useSelector((state) => state.user);
    const note = useSelector((state) => state.notes);
    const [display, setDisplay] = useState("none");
    const [hasError, setHasError] = useState(note.error ? true : false);

    useEffect(() => {
        dispatch({ type: 'RESET_STATE' })
    }, [dispatch])

    async function handleSubmit(e) {
        setHasError(!hasError);

        e.preventDefault();

        let element = e.target;

        const username = element[0]?.value;
        const pass = element[1]?.value;
        if (!username) {
            setHasUsername(false);
        } else if (!pass) {
            setHasPass(false);
        } else {
            setDisplay("block");
            setHasUsername(true);
            setHasPass(true);

            const payload = {
                username: username,
                password: pass
            }
            await dispatch(authUser(payload)).unwrap();
        }
        element[0].value = ""
        element[1].value = ""
    }

    return (
        <div className="container__login white_font" id="login">
            <img style={{ alignSelf: "center", overflow: "hidden" }} src={logo} width="70px" alt="Hey, I'm Marta!" /><span style={{ textAlign: "center", marginBottom: "0.5em" }} id="title">Notes</span>
            <form action="" onSubmit={(e) => { handleSubmit(e) }} method="post">
                <input type="text" placeholder="Username" id="username"></input>
                {!hasUsername ? <small style={{ color: "red" }}>Empty username.</small> : null}
                <input type="password" placeholder="Password" id="password"></input>
                {!hasPass ? <small style={{ color: "red" }}>Empty password.</small> : null}

                <button id="btnLogin">Enter</button>
            </form>
            <small id="signUp" style={{ marginTop: "1em", marginLeft: "1em" }}><Link to="/signup" style={{ textDecoration: "none", font: "inherit", fontSize: "1em", color: "#f7f7f7" }}>Doesn't have an account?</Link></small>
            <Loading display={display} />
            {user.error && <div id="top__right__popup" className="error"><h4>{handleErrorService(user.status)}</h4></div>}
            {!user.loading && user.hasData ? (
                window.location.reload()
            ) : null}
        </div>
    )
}

export default Login