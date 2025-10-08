import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  PlayArrow,
  Headphones,
  YouTube,
} from '@mui/icons-material';
import Layout from "../components/layout";

function Musica() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activePlatform, setActivePlatform] = useState('spotify');

  const platforms = {
    spotify: {
      name: 'Spotify',
      icon: <Headphones />,
      embed: "https://open.spotify.com/embed/playlist/0syLI8nwHBuqwQ50RczT5F?utm_source=generator&theme=1",
      link: "https://open.spotify.com/playlist/0syLI8nwHBuqwQ50RczT5F",
      height: isMobile ? 360 : 400
    },
    youtube: {
      name: 'YouTube',
      icon: <YouTube />,
      embed: "https://www.youtube-nocookie.com/embed/videoseries?list=PL0lmBlr795flokWle6InxECbv6H6xDTBy&widget_referrer=yourwebsite.com&rel=0&modestbranding=1&playsinline=0", 
      link: "https://www.youtube.com/playlist?list=PL0lmBlr795flokWle6InxECbv6H6xDTBy",
      height: isMobile ? 450 : 460 
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            Nuestra Playlist
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Escucha nuestra selección de canciones.
          </Typography>
        </Box>

        {/* Platform Selector */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          {Object.entries(platforms).map(([key, platform]) => (
            <Button
              key={key}
              variant={activePlatform === key ? "contained" : "outlined"}
              startIcon={platform.icon}
              onClick={() => setActivePlatform(key)}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              {platform.name}
            </Button>
          ))}
        </Box>

        <Grid
          container
          spacing={0}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Player */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={3} 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden', 
                position: 'relative',
                transition: 'all 0.3s ease',
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
                '&:hover': {
                  boxShadow: `0 12px 28px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)'}`,
                  elevation: 6,
                },
  
              }}
            > 
              <Box
                component="iframe"
                src={platforms[activePlatform].embed}
                width="100%"
                height={platforms[activePlatform].height}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                sx={{
                  display: 'block',
                  borderRadius: '12px',
                }}
              />
            </Paper>

            {/* Direct Links */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                href={platforms[activePlatform].link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Abrir en {platforms[activePlatform].name}
              </Button>
            </Box>
          </Grid>

        </Grid>

        {/* All Platforms Links */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            También disponible en:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(platforms).map(([key, platform]) => (
              <Button
                key={key}
                variant="outlined"
                startIcon={platform.icon}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: 'none',
                }}
              >
                {platform.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Container>
      

    </Layout>
  )
}

// export const Head = () => <Seo title="Sobre Nosotros" />;
export default Musica;