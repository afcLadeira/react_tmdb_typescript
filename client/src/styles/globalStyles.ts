import { createGlobalStyle} from "styled-components"


export interface ThemeType {
  body: string;
  text: string;
  toggleText: string;
  toggleBorder: string;
  background: string;
  backgroundToggle:  string;
  headBlue: string;


}



export const GlobalStyles  = createGlobalStyle<{theme: ThemeType}>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  p {
    color: ${({ theme }) => theme.text};
  }
  `