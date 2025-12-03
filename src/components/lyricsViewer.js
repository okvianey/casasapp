import React from 'react'
import { marked } from "marked"
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
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

  const html = marked.parse(currentSong.body);

  return (
    <Card className="lirics" sx={{ mb: 2 }}>
      {/* Header con controles de navegación */}
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar variant="dense">
          <Box sx={{
            flexGrow: 1,
          }}>
            <Typography variant="body">
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
        <Button color="secondary" onClick={hasPrev ? onPrev : null} disabled={!hasPrev}>
          <PrevIcon />
          {hasPrev ? 'Anterior' : 'Inicio'} 
        </Button>
        
        <Button color="secondary" onClick={hasNext ? onNext : null} disabled={!hasNext}>
          {hasNext ? 'Siguiente' : 'Fin'}
          <NextIcon />
        </Button>
      </Box>

      {/* Letra de la canción - Renderizado marked */}
      <CardContent
        sx={{
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
      >
          <Box
             dangerouslySetInnerHTML={{ __html: html }}
              sx={{
                width: "100%",
                textAlign: "center",
                "& h1, & h2, & h3": {
                  margin: "10px 0 5px 0",
                  fontSize: "1rem",
                },
                "& p": {
                  margin: "0 0 2px 0",
                },
                "& p strong": {
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px 0 0 0"
                },
                "& p em": {
                  fontSize: "14px"
                }
              }}
            />
      </CardContent>
    </Card>
  );
};

export default LyricsViewer;
