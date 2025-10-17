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
import { useDragAndDrop } from '../hooks/useDragAndDrop';


const LyricsListManager = ({ 
  lyricsList, 
  currentSongIndex, 
  onRemove, 
  onView,
  onClear,
  onMove,
}) => {
  const {
    draggedItem,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(lyricsList, onMove);

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

  const getItemStyle = (index) => {
    const baseStyle = {
      border: 1,
      borderColor: 'divider',
      borderRadius: 1,
      mb: 1,
      cursor: 'grab',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'action.hover',
        boxShadow: 1,
      },
      '&:active': {
        cursor: 'grabbing',
      },
    };
  // Estilo para el elemento que se está arrastrando
    if (index === draggedItem) {
      return {
        ...baseStyle,
        opacity: 0.5,
        backgroundColor: 'action.selected',
        borderColor: 'primary.main',
      };
    }

    // Estilo para el elemento sobre el que se está arrastrando
    if (index === dragOverIndex) {
      return {
        ...baseStyle,
        backgroundColor: 'action.hover',
        borderColor: 'primary.main',
        borderStyle: 'dashed',
        transform: 'scale(1.02)',
      };
    }

    // Estilo para la canción actualmente seleccionada
    if (index === currentSongIndex) {
      return {
        ...baseStyle,
        backgroundColor: 'primary.light',
        borderColor: 'primary.main',
        borderWidth: 2,
      };
    }

    return baseStyle;
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
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            sx={getItemStyle(index)}
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
       
    </Paper>
  );
};

export default LyricsListManager;