import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material/";
import InfoIcon from '@mui/icons-material/Info';
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LibraryMusic from '@mui/icons-material/LibraryMusic';
import ShareIcon from '@mui/icons-material/Share';

function BottomBar() {
  const location = useLocation();
  const currentPage = location.pathname;

  const value =
    currentPage.includes("about") ? 2 :
      currentPage.includes("musica") ? 1 :
        currentPage.includes("cancion") || currentPage.includes("instalar") ? 5 :
          currentPage.includes("compartir") ? 3 : 0;

  return (
    <Paper
      color="inherit"
      sx={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 700,
      }}
      >

      <BottomNavigation
        color="inherit"
        showLabels
        value={value}
        sx={{
          height: 80,
          padding: "10px 0 0 0",
          alignItems: "flex-start"
        }}
      >
        <BottomNavigationAction
          label="Letras"
          icon={<AutoStoriesIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Escuchar"
          icon={<LibraryMusic />}
          component={Link}
          to="/musica"
        />
        <BottomNavigationAction
          label="Info"
          icon={<InfoIcon />}
          component={Link}
          to="/about"
        />
        <BottomNavigationAction
          label="Compartir"
          icon={<ShareIcon />}
          component={Link}
          to="/compartir"
        />

      </BottomNavigation> 
        
    </Paper>
  );
}

export default BottomBar;