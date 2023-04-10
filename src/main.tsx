import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Main from "./components/layouts/Main";
import ThemeProvider from "./context/ThemeContext";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Test from "./pages/Test";
import "./styles.css";

// TODO: Make these load from a config file
// Window Settings
appWindow.setAlwaysOnTop(true);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <MemoryRouter>
        <Main>
          <Routes>
            <Route index path="/" element={<Home />} errorElement={<Error />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Main>
      </MemoryRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
