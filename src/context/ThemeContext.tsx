import React, { createContext } from "react";

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: true,
  toggleTheme: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

type ThemeProviderProps = {
  children: React.ReactNode;
};

// TODO: Add "dark" class to body when dark theme is enabled on page load
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  React.useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("isDarkTheme", "true");
    } else {
      localStorage.setItem("isDarkTheme", "false");
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  React.useEffect(() => {
    const isDark = localStorage.getItem("isDarkTheme");
    if (isDark) {
      setIsDarkTheme(JSON.parse(isDark));
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
