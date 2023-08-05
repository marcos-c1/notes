import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Menu from "./components/Menu"
import Content from "./components/Content";
import { CiMenuBurger } from "react-icons/ci";

import { ThemeContext } from "./components/contexts/Theme";
import { LoginContext } from "./components/contexts/Login";
import { SelectedContext } from "./components/contexts/SelectedNote";
import { ContentContext } from "./components/contexts/Content";

function App() {
  const defaultColorScheme = useContext(ThemeContext);
  const defaultNotes = useContext(SelectedContext);
  const defaultLogin = useContext(LoginContext);
  const defaultContent = useContext(ContentContext);

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");
  const [selectedNote, setSelectedNote] = useState(defaultNotes);
  const [content, setContent] = useState(defaultContent);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
        <SelectedContext.Provider value={[selectedNote, setSelectedNote]}>
          <ContentContext.Provider value={[content, setContent]}>
            <main className="">
              <Menu isLogin={login} />
              <Content />
            </main>
          </ContentContext.Provider>
        </SelectedContext.Provider>
      </ThemeContext.Provider>
    </LoginContext.Provider >
  );
}

export default App;
