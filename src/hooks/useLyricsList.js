import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';


export const useLyricsList = () => {
  const [lyricsList, setLyricsList] = useState([]);
  const [ currentSongIndex, setCurrentSongIndex ] = useState(0);
  const [allSongs, setAllSongs] = useState([]);

  // Consulta GraphQL para obtener todas las canciones
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: {frontmatter: {title: ASC}}) {
        nodes {
          id
          frontmatter {
            title
            slug
          }
          body
        }
      }
    }
  `);

  // Procesar los datos cuando se cargue la consulta
 useEffect(() => {
    const songsFromMdx = data.allMdx.nodes.map(node => ({
      id: node.id,
      title: node.frontmatter.title || 'Sin título',
      slug: node.frontmatter.slug,
      // artist: node.frontmatter.artist || '',
      body: node.body
    }));

    setAllSongs(songsFromMdx);
    
    // Cargar lista desde localStorage
    const savedList = localStorage.getItem('customLyricsList');
    const savedIndex = localStorage.getItem('currentLyricsIndex');
    
    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList);

        // Rehidratar usando los datos actuales (esto recupera body desde MDX)
        const hydratedList = parsedList
          .map(savedSong => {
            const original = songsFromMdx.find(s => s.id === savedSong.id);
            return original ? { ...original, listId: savedSong.listId } : null;
          })
          .filter(Boolean);

        setLyricsList(hydratedList);
      } catch (error) {
        console.error("Error loading saved list:", error);
      }
    }

    if (savedIndex) {
      setCurrentSongIndex(parseInt(savedIndex) || 0);
    }
  }, [data]);

  // Guardar en localStorage cuando cambie la lista
  useEffect(() => {
    if (lyricsList.length > 0) {
      localStorage.setItem(
        'customLyricsList',
        JSON.stringify(
          lyricsList.map(s => ({
            id: s.id,
            listId: s.listId
          }))
        )
      );
      localStorage.setItem('currentLyricsIndex', currentSongIndex.toString());
    } else {
      localStorage.removeItem('customLyricsList');
      localStorage.removeItem('currentLyricsIndex');
    }
  }, [lyricsList, currentSongIndex]);

  const addToLyricsList = (song) => {
    setLyricsList(prev => {
      if (prev.some(s => s.id === song.id)) {
        return prev;
      }
      return [...prev, { ...song, listId: Date.now() }];
    });
  };

  const removeFromLyricsList = (listId) => {
    setLyricsList(prev => {
      const newList = prev.filter(song => song.listId !== listId);
      if (currentSongIndex >= newList.length) {
        setCurrentSongIndex(Math.max(0, newList.length - 1));
      }
      return newList;
    });
  };

  const moveSong = (fromIndex, toIndex) => {
    setLyricsList(prev => {
      const newList = [...prev];
      const [movedSong] = newList.splice(fromIndex, 1);
      newList.splice(toIndex, 0, movedSong);
      return newList;
    });
    
    // Ajustar el índice actual si es necesario
    if (currentSongIndex === fromIndex) {
      setCurrentSongIndex(toIndex);
    } else if (currentSongIndex > fromIndex && currentSongIndex <= toIndex) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (currentSongIndex < fromIndex && currentSongIndex >= toIndex) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const clearLyricsList = () => {
    setLyricsList([]);
    setCurrentSongIndex(0);
  };

  const nextSong = () => {
    setCurrentSongIndex(prev => 
      prev < lyricsList.length - 1 ? prev + 1 : 0
    );
  };

  const prevSong = () => {
    setCurrentSongIndex(prev => 
      prev > 0 ? prev - 1 : lyricsList.length - 1
    );
  };

  const goToSong = (index) => {
    if (index >= 0 && index < lyricsList.length) {
      setCurrentSongIndex(index);
    }
  };

  return {
    lyricsList,
    currentSong: lyricsList[currentSongIndex],
    currentSongIndex,
    allSongs,
    addToLyricsList,
    removeFromLyricsList,
    moveSong,
    clearLyricsList,
    nextSong,
    prevSong,
    goToSong,
    hasNext: currentSongIndex < lyricsList.length - 1,
    hasPrev: currentSongIndex > 0,
    totalSongs: lyricsList.length,
  };
};