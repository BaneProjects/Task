import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/header";
import Skills from "./components/Skills";
import Static from "./components/Static";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(true);
  const [themeName, setThemeName] = useState("Dark Mode");

  const changeTheme = () => {
    if (theme) {
      setTheme(false);
      setThemeName("Light Mode");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(true);
      setThemeName("Dark Mode");
      localStorage.setItem("theme", "light");
    }
  };

  const themeStorage = window.localStorage.getItem("theme");

  useEffect(() => {
    if (themeStorage === "light" || localStorage === null) {
      setTheme(true);
      setThemeName("Dark Mode");
    } else {
      setTheme(false);
      setThemeName("Light Mode");
    }
  }, [themeStorage]);

  return (
    <div className={theme ? null : "dark"}>
      <Header changeTheme={changeTheme} themeName={themeName} />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/skills" element={<Skills />}></Route>
        <Route path="/static" element={<Static />}></Route>
      </Routes>
    </div>
  );
}

export default App;
