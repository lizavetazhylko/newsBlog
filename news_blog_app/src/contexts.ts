import React from "react";
import { Themes } from "./constants";

const ThemeContext = React.createContext({ theme: 'light', setTheme: (theme: Themes) => console.log(theme)});

export { ThemeContext };