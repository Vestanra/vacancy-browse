import { createTheme, CssBaseline, PaletteOptions } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import frameLight from "../images/png/frame-light.png";
import frameDark from "../images/png/frame-dark.png";

interface CustomPaletteOptions extends PaletteOptions {
  blue?: {
      B100?: string;
      BA300?: string;
  },
  
    gray?: {
      G300?: string;
      G400?: string;
      G600?: string;
      G800?: string;
  },
  alertError?: {
    E200?: string;
    E600?: string;
  };  
};

const ThemeContext = createContext({
  toggleTheme: () => { },
  themeMode: 'light' as 'light' | 'dark',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(storedTheme || 'light');

  useEffect(() => {
    localStorage.setItem("theme", themeMode)
  }, [themeMode]);
  
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  }

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: themeMode,
        ...(themeMode === 'light' ?
          {
            primary: {
              light: '#FFFFFF',
              main: '#FFFFFF',
              dark: '#131314',
            },
            blue: {
              B100: '#F0F5FF',
              BA300: '#ABBDE0',
            },
            gray: {
              G300: '#D5D7DB',
              G400: '#B0B3B8',
              G600: '#70737A',
              G800: '#252733',
            },
            alertError: {
              E200: '#FAE1E5',
              E600: '#CC0022',
            },
            backgroundImage: frameLight,
          }
          :
          {
            primary: {
              light: '#FFFFFF',
              main: '#131314',
              dark: '#FFFFFF',
            },
            blue: {
              B100: '#181B29FF',
              BA300: '#3760AD',
            },
            gray: {
              G300: '#414752',
              G400: '#70737A',
              G600: '#B0B3B8',
              G800: '#EBECF0',
            },
            alertError: {
              E200: '#3D2B2E',
              E600: '#CC6677',
            },
            backgroundImage: frameDark,
          }
        )
       
      } as CustomPaletteOptions,
      typography: {
        fontFamily: `'Poppins', sans-serif`,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 360,
            md: 768,
            lg: 1440,
            xl: 1440,
        }
    },
    }), [themeMode]
  );
  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};