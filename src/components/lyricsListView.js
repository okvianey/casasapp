import React, { useState } from 'react'
import { marked } from "marked"
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import { 
  Close as CloseIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
} from '@mui/icons-material';
import { useLyricsList } from '../hooks/useLyricsList';
import LyricsViewer from './lyricsViewer';
import LyricsListManager from './lyricsListManager';
import SongList from './songList';

const LyricsListView = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenSong, setFullscreenSong] = useState(null);

  const {
    lyricsList,
    currentSong,
    currentSongIndex,
    allSongs,
    addToLyricsList,
    removeFromLyricsList,
    moveSong,
    clearLyricsList,
    nextSong,
    prevSong,
    goToSong,
    hasNext,
    hasPrev,
    totalSongs,
  } = useLyricsList();

  const handleViewFullscreen = (song) => {
    setFullscreenSong(song);
    setFullscreenOpen(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenOpen(false);
    setFullscreenSong(null);
  };

  const handleFullscreenFromViewer = () => {
    if (currentSong) {
      setFullscreenSong(currentSong);
      setFullscreenOpen(true);
    }
  };
  // Función para renderizar contenido seguro
  const renderSafeContent = (content) => {
    if (!content) {
      return (
        <Typography textAlign="center" color="text.secondary">
          No hay letra disponible
        </Typography>
      );
    }
    const html = marked.parse(currentSong.body);
     // Por ahora, renderizar como texto plano
    return (
      <Box
        dangerouslySetInnerHTML={{ __html: html }}
        sx={{
          textAlign: 'center',
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
            fontSize: "14px",
            padding: "0 0 30px 0"
          }
        }}
      />
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', p: 2 }}>

      {/* Pestañas */}
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          centered
        >
          <Tab label={`Todas (${allSongs.length})`} />
          <Tab label={`Mi Lista (${lyricsList.length})`} />
        </Tabs>
      </Paper>

      {/* Contenido de las pestañas */}
      {/* todas las canciones */}
      {currentTab === 0 && (
        <SongList
          songs={allSongs}
          onAddToLyricsList={addToLyricsList}
          lyricsList={lyricsList}
          onViewFullscreen={handleViewFullscreen}
        />
      )}
      {/* Mi lista */}
      {currentTab === 1 && (
        <LyricsListManager
          lyricsList={lyricsList}
          currentSongIndex={currentSongIndex}
          onRemove={removeFromLyricsList}
          onView={goToSong}
          onClear={clearLyricsList}
          onMove={moveSong}
        />
      )}

      {/* Modal de pantalla completa para letras individuales */}
      <Dialog
        fullScreen
        open={fullscreenOpen}
        onClose={handleFullscreenClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ minHeight: "40px" }}>
            <IconButton
              edge="start"
              color="inherit"
              size='small'
              onClick={handleFullscreenClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="body">
              {fullscreenSong?.title} {fullscreenSong?.artist && `- ${fullscreenSong.artist}`}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ 
          // p: 4, 
          height: '100%', 
          display: 'flex', 
          // alignItems: 'start', 
          justifyContent: 'center',
          // backgroundColor: 'background.default',
          overflow: 'auto',
        }}>
          <Box
            sx={{
              maxWidth: 800,
              width: '100%',
              // position: "relative",
            }}>
            {renderSafeContent(fullscreenSong?.body)}
          </Box>
        </Box>
      </Dialog>

       {/* Visor de letras principal */}
      {currentTab === 1 &&
        <LyricsViewer
          currentSong={currentSong}
          currentSongIndex={currentSongIndex}
          totalSongs={totalSongs}
          onNext={nextSong}
          onPrev={prevSong}
          onClose={() => goToSong(-1)}
          onFullscreen={handleFullscreenFromViewer}
          hasNext={hasNext}
          hasPrev={hasPrev}
      />}
    </Box>
  );
};

export default LyricsListView;