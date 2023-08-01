import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Menu from "./components/Menu"
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import { CiMenuBurger } from "react-icons/ci";

import { ThemeContext } from "./components/contexts/Theme";

function App() {
  const defaultColorScheme = useContext(ThemeContext);

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
      <main className="">
        <Menu isLogin={login} />
        <div className="main__content" id="main">
          <SideBar />
          <Content />
        </div>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
