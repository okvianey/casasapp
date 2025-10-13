import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Grid
} from '@mui/material';
import {
  Close,
  InstallDesktop,
  Smartphone,
  IosShare,
  AddToHomeScreen,
  Laptop,
  PhoneAndroid,
} from '@mui/icons-material';

// Función mejorada para detectar plataforma
const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Detectar iOS (incluyendo iPad en desktop)
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  
  // Detectar Android
  const isAndroid = /android/i.test(userAgent);
  
  // Detectar dispositivos móviles
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Detectar tablets
  const isTablet = /iPad|Android(?!.*Mobile)|Tablet|Silk/i.test(userAgent);
  
  // Detectar escritorio
  const isDesktop = !isMobile && !isTablet;
  
  // Detectar Windows
  const isWindows = /win/i.test(userAgent) || /windows/i.test(userAgent);
  
  // Detectar Mac
  const isMac = /mac/i.test(userAgent) && !/like mac/i.test(userAgent);

  return {
    isIOS,
    isAndroid,
    isMobile,
    isTablet,
    isDesktop,
    isWindows,
    isMac,
    platform: isIOS ? 'ios' : isAndroid ? 'android' : isDesktop ? 'desktop' : 'other'
  };
};

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // const [ isIOS, setIsIOS ] = useState(false);
  const [platformInfo, setPlatformInfo] = useState({});
  const [isStandalone, setIsStandalone] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {
    // Detectar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

     // Detectar plataforma
    const detectedPlatform = detectPlatform();
    setPlatformInfo(detectedPlatform);
    
    console.log('🔍 Plataforma detectada:', detectedPlatform);

     // Evento para Android/Chrome PWA
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

     // Mostrar después de 3 segundos solo en móviles/tablets
      if (detectedPlatform.isMobile || detectedPlatform.isTablet) {
        setTimeout(() => {
          if (!localStorage.getItem('installPromptDismissed')) {
            setOpen(true);
          }
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

   const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('installPromptDismissed', 'true');
      }
      setDeferredPrompt(null);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  const { isIOS, isAndroid, isMobile, isTablet, isDesktop, platform } = platformInfo;

  // No mostrar si ya está instalada o si es desktop (a menos que sea tablet)
  if (isStandalone || (isDesktop && !isTablet)) {
    return null;
  }

  // Determinar el mensaje según la plataforma
  const getPlatformMessage = () => {
    if (isIOS) {
      return {
        title: "Para iOS",
        icon: <IosShare />,
        steps: [
          "Toca el botón Compartir 📤",
          "Selecciona 'Agregar a pantalla de inicio'",
          "Toca 'Agregar' en la esquina superior derecha"
        ],
        buttonText: "Entendido",
        showInstallButton: false
      };
    } else if (isAndroid) {
      return {
        title: "Para Android",
        icon: <PhoneAndroid />,
        steps: [
          "Abre el menú del navegador (⋮)",
          "Selecciona 'Instalar app' o 'Agregar a pantalla de inicio'",
          "Confirma la instalación"
        ],
        buttonText: "Instalar App",
        showInstallButton: true
      };
    } else {
      return {
        title: "Para tu dispositivo",
        icon: <Smartphone />,
        steps: [
          "Busca la opción 'Instalar app' en el menú de tu navegador",
          "O 'Agregar a pantalla de inicio'",
          "Sigue las instrucciones en pantalla"
        ],
        buttonText: "Instalar App",
        showInstallButton: !!deferredPrompt
      };
    }
  };

  const platformMessage = getPlatformMessage();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <AddToHomeScreen color="primary" />
            Instalar App
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom textAlign="left">
              <strong>¡Mejora tu experiencia!</strong> Agrega la app a tu pantalla de inicio para:
            </Typography>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                <InstallDesktop color="primary" sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="body1" fontWeight="bold">
                  Acceso Rápido
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                <Smartphone color="primary" sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="body1" fontWeight="bold">
                  Sin Navegador
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Instrucciones específicas por plataforma */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 2, 
                backgroundColor: theme.palette.primary.main + '10',
                borderRadius: 2,
                border: `1px solid ${theme.palette.primary.main}30`
              }}
            >
              <Typography variant="body2" fontWeight="bold" gutterBottom display="flex" alignItems="center" gap={1}>
                {platformMessage.icon} {platformMessage.title}:
              </Typography>
              <Box component="ol" sx={{ pl: 2, m: 0 }}>
                {platformMessage.steps.map((step, index) => (
                  <Typography key={index} variant="body1" component="li" sx={{ mb: 1 }}>
                    {step}
                  </Typography>
                ))}
              </Box>
              
            </Paper>
          </Grid>

          {/* Mensaje para dispositivos no soportados */}
          {!isIOS && !isAndroid && !deferredPrompt && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" textAlign="center" fontStyle="italic">
                Tu navegador podría no soportar la instalación de apps. Prueba con Chrome en Android o Safari en iOS.
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Ahora no
        </Button>
        
        {platformMessage.showInstallButton && deferredPrompt && (
          <Button
            variant="contained"
            onClick={handleInstall}
            startIcon={<InstallDesktop />}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 'bold',
            }}
          >
            {platformMessage.buttonText}
          </Button>
        )}
        
        {!platformMessage.showInstallButton && (
          <Button
            variant="contained"
            onClick={handleClose}
            startIcon={platformMessage.icon}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 'bold',
            }}
          >
            {platformMessage.buttonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InstallPrompt;