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
            Escucha nuestra selección de canciones
          </Typography>

        </Box>

        {/* Platform Selector */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          {Object.entries(platforms).map(([i, platform]) => (
            <Button
              key={i}
              variant={platform.name === "Spotify" ? "contained" : "outlined"}
              startIcon={platform.icon}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                // borderRadius: 3,
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

          </Grid>

        </Grid>

      </Container>
      

    </Layout>
  )
}

// export const Head = () => <Seo title="Sobre Nosotros" />;
export default Musica;