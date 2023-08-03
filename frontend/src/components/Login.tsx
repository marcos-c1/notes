import { VscGithub } from "react-icons/vsc";
import { SiGmail } from "react-icons/si";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        let element = e.target;
        setUsername(element[0].value);
        setUsername(element[1].value);

        element[0].value = ""
        element[1].value = ""

    }

    return (
        <div className="container__login" id="login">
            <h3 style={{ textAlign: "center", marginBottom: "15px", overflow: "hidden" }}>Log in</h3>
            <form action="" onSubmit={handleSubmit} method="post">
                <input type="text" placeholder="Username" id="username"></input>
                <input type="password" placeholder="Password" id="password"></input>
                <button style={{ display: "none" }}></button>
            </form>
            <small>Doesn't have an account?</small>
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
    )
}

export default Login