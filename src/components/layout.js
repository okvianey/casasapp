import React, { useEffect, useMemo, useState } from "react";
import { ColorModeContext } from "./context";
import { CssBaseline, Container, GlobalStyles } from "@mui/material/";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavbarTop from "./NavbarTop";
import BottomBar from "./BottomBar";
import InstallFab from "./install-fab";

const getDefaultTheme = () => {
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) return "light"; 

  const colorStorage = localStorage.getItem("color-mode");
  const systemColor = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return colorStorage === "light" || !systemColor ? "light" : "dark";
};


const Layout = ({ children }) => {
  const [ mode, setMode ] = useState(getDefaultTheme());
  const [isThemeLoaded, setIsThemeLoaded] = useState(false); // Estado para verificar si el tema está cargado

  useEffect(() => {
    const defaultMode = getDefaultTheme(); // Obtén el tema predeterminado
    setMode(defaultMode); // Establece el tema
    setIsThemeLoaded(true); // Marca el tema como cargado
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? "#6339ccff" : "#a483f6",
            light: "#6339ccff",
            dark: "#a483f6",
          },
          secondary: {
            main: mode === 'light' ? "#2e2e2e" : "#ffffff",
            dark: "#2e2e2e",
            light: "#fff",
          },
          neutral: {
            main: mode === 'light' ? "#2e2e2e" : "#ffffff",
            contrastText: mode === 'light' ? "#2e2e2e" : "#ffffff",
            contrast: mode === 'light' ? "#ffffff" : "#2e2e2e",
            bgDark: "#2e2e2e",
            bgLight: "#fff"
          },
          element: {
            main: mode === 'light' ? "#b5bcc6ff" : "#ffffff",
          },
        },
        typography: {
          fontSize: 14,
          h1: {
            fontSize: "1.8rem",
          },
          h2: {
            fontSize: "1.5rem",
          },
          h3: {
            fontSize: "1.1rem",
          },
          body2: {
            fontSize: "1.4rem",
          },
          body3: {
            fontSize: "1.1rem",
          },
        },
      }),
    [mode]
  );

  // Text Size
  const [textSize, setTextSize] = useState(() => {
    const isBrowser = typeof window !== "undefined";
    const textStorage = isBrowser ? localStorage.getItem("textSizeStorage") : "16";
    return parseInt(textStorage) || 16;
  });

  const handleTextSize = (direction) => {
    setTextSize((prevSize) => {
      if (direction === "up" && prevSize < 30) return prevSize + 1;
      if (direction === "down" && prevSize >= 12) return prevSize - 1;
      return prevSize;
    });
  };

  useEffect(() => {
    localStorage.setItem("color-mode", mode);
    localStorage.setItem("textSizeStorage", textSize);
  }, [ mode, textSize ]);
  
  if (!isThemeLoaded) {
    return null; // No renderices nada hasta que el tema esté cargado
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        />
        <Container
          sx={{
            padding: "80px 10px",
            maxWidth: { md: "600px" },
            'ol p': {
              fontSize: `${textSize}px`,
            },
            'p': {
              fontSize: `${textSize}px`,
            } 

          }} >
            <NavbarTop 
              mode={mode} 
              handleTextSize={handleTextSize}
              textSize={textSize}
          />
          {/* si pasamos el componente BottomBar debajo de childre, se genera un bug al cambiar de tema dar a light. La barra permanece de un solo color */}
           <BottomBar />
          {children}
          
          {/* Componentes de instalación */}
          {/* <InstallFab /> */}
          
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;