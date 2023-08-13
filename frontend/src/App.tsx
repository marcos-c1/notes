import { useContext, useState } from "react";
import "./App.css";
import Content from "./components/Content";
import SignUp from "./pages/SignUp";
import { ThemeContext } from "./components/contexts/Theme";
import { LoginContext } from "./components/contexts/Login";
import { SelectedContext } from "./components/contexts/SelectedNote";
import { ContentContext } from "./components/contexts/Content";
import { NotesContext } from "./components/contexts/NotesByUserContext";
import { DisconnectContext } from "./components/contexts/Disconnect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const defaultColorScheme = useContext(ThemeContext);
  const defaultNotes = useContext(SelectedContext);
  const defaultLogin = useContext(LoginContext);
  const defaultContent = useContext(ContentContext);
  const defaultNote = useContext(NotesContext);
  const defaultDisconnect = useContext(DisconnectContext);

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");
  const [selectedNote, setSelectedNote] = useState(defaultNotes);
  const [content, setContent] = useState(defaultContent);
  const [noteByUser, setNotes] = useState(defaultNote);
  const [disconnect, setDisconnect] = useState(defaultDisconnect);

  return (
    <Router>
      <LoginContext.Provider value={[login, setLogin]}>
        <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
          <SelectedContext.Provider value={[selectedNote, setSelectedNote]}>
            <ContentContext.Provider value={[content, setContent]}>
              <NotesContext.Provider value={[noteByUser, setNotes]}>
                <DisconnectContext.Provider value={[disconnect, setDisconnect]}>
                  <main className="App">
                    <Routes>
                      <Route path="/" Component={Content} />
                      <Route path="/signup" Component={SignUp} />
                    </Routes>
                  </main>
                </DisconnectContext.Provider>
              </NotesContext.Provider>
            </ContentContext.Provider>
          </SelectedContext.Provider>
        </ThemeContext.Provider>
      </LoginContext.Provider >
    </Router>
  );
}

export default App;
