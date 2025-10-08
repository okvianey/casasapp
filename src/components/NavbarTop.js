import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import {
  AppBar,
  Box,
  Toolbar,
  Divider,
  IconButton,
} from "@mui/material/";
import { styled } from '@mui/material/styles';
import logo from "../images/logo.png";
import logoWhite from "../images/logo-white.svg";
import DarkModeSwitch from "./darkModeSwitch";
import ComboBox from "./comboBox";
import TextZoomButtons from "./textZoomButtons";

const TextZoomBox = styled('div')(({ theme }) => ({
  padding: "15px 10px 0 10px",
  display: "flex",
  justifyContent: "space-evenly",
  [ theme.breakpoints.down('sm') ]: {
    flexDirection: "column",
    alignItems: "center",
  }
}))

const NavbarTop = ({
  mode,
  handleTextSize,
  textSize,
}) => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <AppBar
      color="inherit"
      position="fixed"
      sx={{
        padding: "10px",
        zIndex: 100
      }}>
      <Toolbar
        // color="inherit"
        disableGutters
        sx={{
          justifyContent: { xs: "space-between", md: "space-around" },
          alignItems: "center",
        }}
      >
        <IconButton
          component={Link}
          to="/"
          sx={{
            width: { xs: "80px", "borderRadius": "0", }
          }}
        >
          {
            mode === "dark" ? 
              <img src={logoWhite} alt="logo" width={"100%"} /> :
              <img src={logo} alt="logo" width={"100%"} />
          }
        </IconButton>
        <Box style={{display: 'inline-flex', alignItems: 'center'}}>     
          <TextZoomButtons textSize={textSize} handleTextSize={handleTextSize} />
          <DarkModeSwitch mode={mode} />
        </Box>  
      </Toolbar>

      <Divider />

      {
        currentPage.includes("about") ? <span></span> : 

        <TextZoomBox sx={{ justifyContent: "center", alignItems: "center" }}>
          {
            !currentPage.includes("cancion") ? <span></span> : <ComboBox />
          }
        </TextZoomBox> 
      }
    
    </AppBar>
  );
};

export default NavbarTop;
