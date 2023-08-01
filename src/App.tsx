import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import  Menu  from "./components/Menu"
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import { CiMenuBurger } from "react-icons/ci";

function App() {
  const defaultColorScheme = "black";

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false)
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="">
      <Menu isLogin={login}/>
      <div className="main__content">
        <SideBar />
        <Content />
      </div>
    </main>
  );
}

export default App;
