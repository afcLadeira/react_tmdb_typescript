import { useDarkMode } from "../hooks/useDarkMode";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import { ReactNode, createContext} from "react";

export type ThemeContextInterface = {
  theme: string;
  themeToggler: () => void;
};

const ThemeContext = createContext({} as ThemeContextInterface);

export const MyThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, themeToggler] = useDarkMode("light");

  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
