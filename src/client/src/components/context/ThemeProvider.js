import React, { useState } from "react";

export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}
