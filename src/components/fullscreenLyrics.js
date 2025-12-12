import React from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Slide,
  Tooltip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
  // FullscreenExit as FullscreenExitIcon,
} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullscreenLyrics = ({ lyrics }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Botón para abrir pantalla completa */}
      <Tooltip placement="top">
        <IconButton 
          onClick={handleOpen}
          color="inherit"
          title="Ver letra en pantalla completa"
        >
          <FullscreenIcon />
        </IconButton>
      </Tooltip>

      {/* Diálogo de pantalla completa */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{
          position: 'relative',
          backgroundColor: 'background.paper',

        }}>
          <Toolbar sx={{ minHeight: '10px' }}>
            <IconButton
              edge="start"
              // color="inherit"
              onClick={handleClose}
              aria-label="cerrar"
              size='small'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            // height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            backgroundColor: 'background.default',
            overflow: 'auto',
          }}
        >
          {/* <IconButton
              edge="start"
              // color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton> */}
          
          <Typography
            variant="body"
            component="body"
            sx={{
              // whiteSpace: 'pre-wrap',
              textAlign: 'center',
              fontFamily: 'inherit',
              maxWidth: '800px',
              margin: "0",
              '&.MuiTypography-root h3': {
                margin: "2px 0 1px 0",
                // fontSize: { xs: '1.2rem', md: '1.5rem' },
                },
              '&.MuiTypography-root p': {
                margin: "0",
                padding: '0 2px'
                },
              '& strong': {
                display: "flex",
                justifyContent: "center",
                margin: "40px 0 15px 0",
                // padding: "15px 0",
                },
              '& em': {
                justifyContent: "center",
                // margin: "40px 0",
                padding: "20px 15px",
                },
            }}
          >
            {lyrics}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default FullscreenLyrics;