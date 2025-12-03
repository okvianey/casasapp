import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import {
  PlaylistAdd as AddToListIcon,
  Fullscreen as FullscreenIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const SongList = ({ songs, onAddToLyricsList, lyricsList, onViewFullscreen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);

  // Filtrar canciones basado en la búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.body.toLowerCase().includes(searchTerm.toLowerCase())
        // song.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
        // ||
        // song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      );
      setFilteredSongs(filtered);
    }
  }, [searchTerm, songs]);

  const isInList = (songId) => {
    return lyricsList.some(song => song.id === songId);
  };

  if (songs.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No hay canciones disponibles
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      {/* Barra de búsqueda */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar canciones"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          size="small"
          sx={{
            mb: 1,
          }}
        />
        <Typography variant="body" color="text.secondary" 
          sx={{
            mt: 1,
          }}
        >
          {filteredSongs.length} de {songs.length} canciones
        </Typography>
      </Box>

      {/* Lista de canciones */}
      <List>
        {filteredSongs.map((song) => (
          <ListItem
            key={song.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={
                <Typography variant="body" component="div"
                  sx={{
                  maxWidth: { xs: 180, sm: 'none' },
                }}
                >
                  {song.title}
                  {/* {song.frontmatter.title} */}
                </Typography>
              }
      
            />
            
            <ListItemSecondaryAction>
              {/* Botón para ver en pantalla completa */}
              <Tooltip title="Ver letra completa">
                <IconButton
                  onClick={() => onViewFullscreen(song)}
                  color="primary"
                >
                  <FullscreenIcon />
                </IconButton>
              </Tooltip>

              {/* Botón para agregar a lista */}
              <Tooltip title={
                isInList(song.id) 
                  ? "Ya en la lista" 
                  : "Agregar a mi lista de letras"
              }>
                <span>
                  <IconButton
                    onClick={() => !isInList(song.id) && onAddToLyricsList(song)}
                    disabled={isInList(song.id)}
                    color={isInList(song.id) ? "success" : "primary"}
                    sx={{
                      p: 0
                    }}
                  >
                    <AddToListIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {filteredSongs.length === 0 && (
        <Typography textAlign="center" color="text.secondary" sx={{ py: 3 }}>
          No se encontraron canciones que coincidan con "{searchTerm}"
        </Typography>
      )}
    </Paper>
  );
};

export default SongList;