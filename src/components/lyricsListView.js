import React, { useState } from 'react';
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
import { MDXRenderer } from 'gatsby-plugin-mdx';
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

     // Por ahora, renderizar como texto plano
    return (
      <Typography
        component="pre"
        sx={{
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
          fontSize: '1.2rem',
          lineHeight: 1.8,
          fontFamily: 'inherit',
        }}
      >
        {content}
      </Typography>
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
          <Tab label={`Todas las Canciones (${allSongs.length})`} />
          <Tab label={`Mi Lista (${lyricsList.length})`} />
        </Tabs>
      </Paper>

      {/* Contenido de las pestañas */}
      {currentTab === 0 && (
        <SongList
          songs={allSongs}
          onAddToLyricsList={addToLyricsList}
          lyricsList={lyricsList}
          onViewFullscreen={handleViewFullscreen}
        />
      )}

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
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleFullscreenClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
              {fullscreenSong?.title} {fullscreenSong?.artist && `- ${fullscreenSong.artist}`}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ 
          p: 4, 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'background.default',
          overflow: 'auto',
        }}>
          <Box sx={{ maxWidth: 800, width: '100%' }}>
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