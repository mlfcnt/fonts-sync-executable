import React, { useState } from "react";

export const ThemeContext = React.createContext();

export function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}
