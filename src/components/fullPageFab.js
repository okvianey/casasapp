import React from 'react';
import {
  Fab,
} from '@mui/material';

import FullscreenLyrics from './fullscreenLyrics';


const FullPageFab = ({ lyrics }) => {

   const getAriaLabel = () => {
    return "Dar clic para instalar como aplicación";
  };

  return (
    
    <Fab
      color="primary"
      aria-label={getAriaLabel()}
      sx={{
        position: 'fixed',
        bottom: 80,
        right: 16,
        zIndex: 1000,
        '&:hover': {
          transform: 'scale(1.1)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      <FullscreenLyrics lyrics={lyrics}/>
      
    </Fab>
  );
};

export default FullPageFab;