import { useContext } from "react";

import ThemeContext, { ThemeContextInterface } from '../context/ThemeProvider'

export default function useTheme() {
    return useContext<ThemeContextInterface>(ThemeContext)
}