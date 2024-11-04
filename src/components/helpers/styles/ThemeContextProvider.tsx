import { createTheme, CssBaseline, PaletteOptions } from "@mui/material";
import { margin, padding, ThemeProvider } from "@mui/system";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import frameLight from "../../../images/png/frame-light.png";
import frameDark from "../../../images/png/frame-dark.png";

export interface CustomPaletteOptions extends PaletteOptions {
  blue?: {
      B100?: string;
      BA300?: string;
  },
  
  gray?: {
    G100?: string;
    G300?: string;
    G200?: string;
    G400?: string;
    G600?: string;
    G700?: string;
    G800?: string;
  },
  alertError?: {
    E200?: string;
    E600?: string;
  };
  alertWarning?: {
    E200?: string;
    E600?: string;
  };
  alertInfo?: {
    E200?: string;
    E600?: string;
  };
  alertSuccess?: {
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
              contrastText: '#0F62FE',
            },
            blue: {
              B100: '#F0F5FF',
              BA300: '#ABBDE0',
            },
            gray: {
              G100: '#F6F7F8',
              G200: '#EBECF0',
              G300: '#D5D7DB',
              G400: '#B0B3B8',
              G600: '#70737A',
              G700: '#4D4D4D',
              G800: '#252733',
            },
            alertError: {
              E200: '#FAE1E5',
              E600: '#CC0022',
            },
            alertWarning: {
              E200: '#FAE9C8',
              E600: '#F9902D',
            },
            alertSuccess: {
              E200: '#DCF2DC',
              E600: '#187A18',
            },
            alertInfo: {
              E200: '#DCEDF5',
              E600: '#1F7099',
            },
            backgroundImage: frameLight,               
          }
          :
          {
            primary: {
              light: '#FFFFFF',
              main: '#131314',
              dark: '#FFFFFF',
              contrastText: '#5B94FE',
            },
            blue: {
              B100: '#181B29FF',
              BA300: '#3760AD',
            },
            gray: {
              G100: '#181A1F',
              G200: '#252733',
              G300: '#414752',
              G400: '#70737A',
              G600: '#B0B3B8',
              G700: '#C9CED6',
              G800: '#EBECF0',
            },
            alertError: {
              E200: '#3D2B2E',
              E600: '#CC6677',
            },
            alertWarning: {
              E200: '#4D4536',
              E600: '#F9AC64',
            },
            alertSuccess: {
              E200: '#2B3D2B',
              E600: '#57AD57',
            },
            alertInfo: {
              E200: '#2B373D',
              E600: '#52A3CC',
            },
            backgroundImage: frameDark, 
          }
        )
       
      } as CustomPaletteOptions,
       components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: themeMode === 'light' ? '#F6F7F8' : '#181A1F', 
                minHeight: '100vh', 
              },
              button: {
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              },
              ul: {
                listStyleType: 'none',
                padding: "0",
                margin: "0",
              }
            },
         },
         MuiButton: {
                styleOverrides: {
                  root: {
                    textTransform: 'none',
                    color: themeMode === 'light' ? '#252733' : '#EBECF0',
                    border: `2px solid ${themeMode === 'light' ? '#ABBDE0' : '#3760AD'}`,
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: themeMode === 'light' ? '#F0F5FF' : '#181B29FF', },
                    height: '48px',
                    textAlign: 'center',
                    },
                  },
              },
        },
      typography: {
        fontFamily: `'Poppins', sans-serif`,
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