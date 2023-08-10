import { useContext, useState } from "react";
import "./App.css";
import Content from "./components/Content";
import SignUp from "./pages/SignUp";
import { ThemeContext } from "./components/contexts/Theme";
import { LoginContext } from "./components/contexts/Login";
import { SelectedContext } from "./components/contexts/SelectedNote";
import { ContentContext } from "./components/contexts/Content";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

  return (
    <Router>
      <LoginContext.Provider value={[login, setLogin]}>
        <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
          <SelectedContext.Provider value={[selectedNote, setSelectedNote]}>
            <ContentContext.Provider value={[content, setContent]}>
              <main className="App">
                <Routes>
                  <Route path="/" Component={Content} />
                  <Route path="/signup" Component={SignUp} />
                </Routes>
              </main>
            </ContentContext.Provider>
          </SelectedContext.Provider>
        </ThemeContext.Provider>
      </LoginContext.Provider >
    </Router>
  );
}

export default App;
