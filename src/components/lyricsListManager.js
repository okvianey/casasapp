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
  Delete,
} from '@mui/icons-material';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortableList } from "../hooks/useSortableList";
import SortableItem from "./SortableItem";
  

const LyricsListManager = ({ 
  lyricsList, 
  currentSongIndex, 
  onRemove, 
  onView,
  onClear,
  onMove,
}) => {
  const { items, handleDragEnd } = useSortableList(lyricsList, onMove);


  if (items.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Tu lista está vacía
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Agrega canciones desde el listado principal para ver sus letras en orden
        </Typography>
      </Paper>
    );
  }

  const getItemStyle = (isCurrent) => ({
    border: 1,
    borderColor: 'divider',
    borderRadius: 1,
    mb: 1,
    p: "8px 2px",
    transition: 'all 0.2s ease',
    backgroundColor: isCurrent ? 'primary.light' : 'background.paper',
    borderWidth: isCurrent ? 2 : 1,
  });



  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Canciones ({items.length})</Typography>
        <Button 
          startIcon={<Delete />} 
          onClick={onClear}
          color="error"
          size="small"
        >
          Limpiar lista
        </Button>
      </Box>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((s) => s.listId)} strategy={verticalListSortingStrategy}>
          <List>
            {items.map((song, index) => (
              <SortableItem key={song.listId} id={song.listId}>
                <ListItem sx={getItemStyle(index === currentSongIndex)}>
                  
                  {/* Drag handle */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                    <DragIcon color="action" />
                    <Chip label={index + 1} color={index === currentSongIndex ? "primary" : "default"} />
                  </Box>

                  {/* Text */}
                  <ListItemText
                    primary={song.title}
                    onClick={() => onView(index)}
                    sx={{
                      flex: 1,
                      maxWidth: { xs: "160px", sm: "100%" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "normal",
                      cursor: "pointer",
                    }}
                  />

                  {/* Delete */}
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => onRemove(song.listId)}
                      color="error"
                      sx={{ ml: 1, p: 0 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </SortableItem>
            ))}
          </List>
        </SortableContext>
      </DndContext>
       
    </Paper>
  );
};

export default LyricsListManager;