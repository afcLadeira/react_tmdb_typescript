import { useEffect, useState } from 'react';


export const useDarkMode = (initialValue: string): [string,() => void] => {

    const [theme, setTheme] = useState<string>(initialValue);
    
    const setMode = (mode : string) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme)
    }, []);
    
    return [theme, themeToggler]
};      