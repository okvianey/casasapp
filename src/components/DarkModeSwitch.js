import React from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { ColorModeContext } from './context';

export default function DarkModeSwitch({ mode }) {

  const colorMode = React.useContext(ColorModeContext);

  return (
    <IconButton sx = {{ ml: 1 }} onClick = { colorMode.toggleColorMode } color = "inherit" >
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon color='neutral'/>}
    </IconButton>
  )
}