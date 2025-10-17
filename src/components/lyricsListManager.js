import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ClearAll as ClearIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';

const LyricsListManager = ({ 
  lyricsList, 
  currentSongIndex, 
  onRemove, 
  onView,
  onClear,
  onDragStart,
  onDragOver,
  onDrop,
  onMove,
}) => {
  const [dragStartIndex, setDragStartIndex] = useState(null);

  if (lyricsList.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Tu lista de letras está vacía
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Agrega canciones desde el listado principal para ver sus letras en orden
        </Typography>
      </Paper>
    );
  }

   const handleDragStart = (e, index) => {
    setDragStartIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragStartIndex !== null && dragStartIndex !== dropIndex && onMove) {
      onMove(dragStartIndex, dropIndex);
    }
    setDragStartIndex(null);
  };


  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Mi Lista de Letras ({lyricsList.length} canciones)
        </Typography>
        <Button 
          startIcon={<ClearIcon />} 
          onClick={onClear}
          color="error"
          size="small"
        >
          Limpiar lista
        </Button>
      </Box>

      <List>
        {lyricsList.map((song, index) => (
          <ListItem
            key={song.listId}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, index)}
            sx={{
              backgroundColor: index === currentSongIndex ? 'action.selected' : 'background.paper',
              border: index === currentSongIndex ? 1 : 0,
              borderColor: 'primary.main',
              borderRadius: 1,
              mb: 1,
              cursor: 'grab',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {/* Ícono de arrastrar y número */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <DragIcon color="action" sx={{ mr: 1 }} />
              <Chip 
                label={index + 1} 
                size="small" 
                color={index === currentSongIndex ? "primary" : "default"}
              />
            </Box>

            {/* Información de la canción */}
            <ListItemText
              primary={song.title}
              secondary={song.artist}
              sx={{ flex: 1 }}
            />

            {/* Acciones */}
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                onClick={() => onView(index)}
                color="primary"
                title="Ver letra"
              >
                <ViewIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                onClick={() => onRemove(song.listId)}
                color="error"
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
       <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        💡 Arrastra las canciones para reordenar tu lista
      </Typography>
    </Paper>
  );
};

export default LyricsListManager;