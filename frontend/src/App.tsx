import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Menu from "./components/Menu"
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import { CiMenuBurger } from "react-icons/ci";

import { ThemeContext } from "./components/contexts/Theme";
import { LoginContext } from "./components/contexts/Login";
import { NotesContext } from "./components/contexts/Notes";

function App() {
  const defaultColorScheme = useContext(ThemeContext);
  const defaultNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];
  const defaultLogin = useContext(LoginContext);

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");

  const [notes, setNotes] = useState(defaultNotes);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
        <NotesContext.Provider value={[notes, setNotes]}>
          <main className="">
            <Menu isLogin={login} />
            <div className="main__content" id="main">
              <SideBar />
              <Content />
            </div>
          </main>
        </NotesContext.Provider>
      </ThemeContext.Provider>
    </LoginContext.Provider >
  );
}

export default App;
