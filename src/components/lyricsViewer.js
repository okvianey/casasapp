import React from 'react';

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';

const LyricsViewer = ({
  currentSong,
  currentSongIndex,
  totalSongs,
  onNext,
  onPrev,
  onClose,
  onFullscreen,
  hasNext,
  hasPrev,
}) => {
  if (!currentSong) {
    return (
      <Card sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Mi Lista de Letras
        </Typography>
        <Typography color="text.secondary">
          Agrega canciones para ver sus letras en orden
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      {/* Header con controles de navegación */}
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar variant="dense">
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
          
          <Box sx={{
            flexGrow: 1,
            ml: 1,
            // maxWidth: { xs: 80, sm: 'none' }
          }}>
            <Typography variant="body"
              sx={{
                // maxWidth: { xs: 80, sm: 'none' }
            }}
            >
              {currentSong.title}
            </Typography>
          </Box>

          <Chip 
            label={`${currentSongIndex + 1} / ${totalSongs}`}
            size="small"
            color="primary"
            sx={{ mr: 1 }}
          />

          <IconButton onClick={onFullscreen} size="small">
            <FullscreenIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Controles de navegación */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
        <IconButton onClick={onPrev} disabled={!hasPrev}>
          <PrevIcon />
        </IconButton>
        
        <Typography variant="body" color="text.secondary">
          {hasPrev ? 'Anterior' : 'Inicio'} • {hasNext ? 'Siguiente' : 'Fin'}
        </Typography>
        
        <IconButton onClick={onNext} disabled={!hasNext}>
          <NextIcon />
        </IconButton>
      </Box>

      {/* Letra de la canción - Renderizado MDX */}
      <CardContent>
        <Box
          sx={{
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          {currentSong.body ? (
            <Typography
              component="pre"
              sx={{
                whiteSpace: 'pre-wrap',
                textAlign: 'center',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                fontFamily: 'inherit',
                width: '100%',
              }}
            >
              {currentSong.body}
            </Typography>
          ) : (
            <Typography color="text.secondary">
              No hay letra disponible para esta canción
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LyricsViewer;
