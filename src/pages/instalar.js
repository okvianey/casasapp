import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Card,
  CardContent,
  useTheme,
  Alert
} from '@mui/material';
import {
  Download,
  AddToHomeScreen,
  PhoneAndroid,
  Apple,
  Laptop,
  Share,
  AddBox,
  OpenInBrowser,
  Smartphone,
  CheckCircle
} from '@mui/icons-material';
import Layout from "../components/layout";

// Función para detectar plataforma
const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = /android/i.test(userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)|Tablet|Silk/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  const isWindows = /win/i.test(userAgent) || /windows/i.test(userAgent);
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

const InstallPage = () => {
  const theme = useTheme();
  const platformInfo = detectPlatform();
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [installationStatus, setInstallationStatus] = React.useState('idle');

  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          setInstallationStatus('success');
        } else {
          setInstallationStatus('declined');
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        setInstallationStatus('error');
        console.error('Error durante la instalación:', error);
      }
    } else {
      // Si no hay deferredPrompt, mostrar instrucciones
      setInstallationStatus('instructions');
    }
  };

  const getPlatformConfig = () => {
    const { isIOS, isAndroid, } = platformInfo;

    if (isIOS) {
      return {
        title: "Instalación manual en iOS",
        icon: <Apple sx={{ fontSize: 48, }} />,
        color: '#000000',
        steps: [
          {
            label: 'Abrir en Safari',
            description: 'En Safari, toca los tres puntos para ver el ícono de compartir (📤) en la barra inferior',
            icon: <Share />
          },
          {
            label: 'Seleccionar opción',
            description: 'Desplázate hacia abajo y toca "Agregar a pantalla de inicio"',
            icon: <AddBox />
          },
          {
            label: 'Confirmar instalación',
            description: 'Toca "Agregar" en la esquina superior derecha',
            icon: <OpenInBrowser />
          }
        ],
        buttonText: "Instalar",
        showInstallButton: false
      };
    } else if (isAndroid) {
      return {
        title: "Instalación manual en Android",
        icon: <PhoneAndroid sx={{ fontSize: 48, }} />,
        color: '#000000',
        steps: [
          {
            label: 'Abrir menú del navegador',
            description: 'Toca los tres puntos (⋮) en la esquina superior derecha',
            icon: <Share />
          },
          {
            label: 'Seleccionar instalar',
            description: 'Toca "Instalar app" o "Agregar a pantalla de inicio"',
            icon: <AddBox />
          },
          {
            label: 'Confirmar instalación',
            description: 'Toca "Instalar" o "Agregar" en el diálogo de confirmación',
            icon: <Smartphone />
          }
        ],
        buttonText: "Instalar",
        showInstallButton: true
      };
    } else {
      return {
        title: "Instalación manual en tu dispositivo",
        icon: <Laptop sx={{ fontSize: 48, }} />,
        color: '#000000',
        steps: [
          {
            label: 'Abrir menú del navegador',
            description: 'Busca la opción de menú (⋮) o "Archivo" en tu navegador',
            icon: <Share />
          },
          {
            label: 'Buscar opción de instalación',
            description: 'Busca "Instalar app", "Crear acceso directo" o "Agregar a pantalla de inicio"',
            icon: <AddBox />
          },
          {
            label: 'Seguir instrucciones',
            description: 'Sigue las instrucciones específicas de tu navegador y sistema operativo',
            icon: <OpenInBrowser />
          }
        ],
        buttonText: "Instalar",
        showInstallButton: !!deferredPrompt
      };
    }
  };

  const platformConfig = getPlatformConfig();
  const { isIOS, isAndroid, } = platformInfo;

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: theme.palette.primary.main,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Instalar como aplicación
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Agrega la app a tu pantalla de inicio para acceso rápido
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Panel lateral */}
          <Grid item xs={12}>
            <Box position="sticky" top={20}>
              {/* Estado de instalación */}
              {installationStatus === 'success' && (
                <Alert severity="success" sx={{ mt: 3 }}>
                  <Typography fontWeight="bold">
                    ¡App instalada exitosamente!
                  </Typography>
                  La aplicación se ha instalado en tu dispositivo.
                </Alert>
              )}

              {installationStatus === 'declined' && (
                <Alert severity="info" sx={{ mt: 3 }}>
                  Instalación cancelada. Puedes intentarlo nuevamente cuando quieras.
                </Alert>
              )}

              {installationStatus === 'error' && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  Ocurrió un error durante la instalación. Sigue las instrucciones manuales.
                </Alert>
              )}

              {installationStatus === 'instructions' && (
                <Alert severity="info" sx={{ mt: 3 }}>
                  Tu navegador no soporta instalación automática. Sigue las instrucciones paso a paso.
                </Alert>
              )}

              {/* Botón de instalación */}
              <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <AddToHomeScreen 
                    sx={{ 
                      fontSize: 60, 
                      color: theme.palette.primary,
                      mb: 2 
                    }} 
                  />
                  
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    Instalar Ahora
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {isIOS 
                      ? "Agrega la app a tu pantalla de inicio para acceso rápido"
                      : "Instala la aplicación como una app nativa en tu dispositivo"
                    }
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={platformConfig.showInstallButton ? <Download /> : <AddToHomeScreen />}
                    onClick={handleInstall}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      // color: theme.palette.neutral.main,
                      // backgroundColor: platformConfig.color,
                      '&:hover': {
                        // backgroundColor: platformConfig.color,
                        opacity: 0.9,
                      }
                    }}
                  >
                    {platformConfig.buttonText}
                  </Button>

                </CardContent>
              </Card>

              
            </Box>
          </Grid>
          {/* Instrucciones de instalación */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={4}>
                {platformConfig.icon}
                <Box>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    {platformConfig.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sigue estos pasos para instalar la app en tu {isIOS ? 'iPhone/iPad' : isAndroid ? 'dispositivo Android' : 'dispositivo'}
                  </Typography>
                </Box>
              </Box>

              {/* Stepper de instrucciones */}
              <Stepper orientation="vertical" sx={{ mt: 2 }}>
                {platformConfig.steps.map((step, index) => (
                  <Step key={step.label} active={true}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            backgroundColor: platformConfig.color,
                            color: 'white',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {index + 1}
                        </Box>
                      )}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        {step.icon}
                        <Typography variant="body1" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>

          
        </Grid>

        {/* Beneficios */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Acceso Rápido
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Disponible directamente desde tu pantalla principal
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
              <Download color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Sin Descarga
              </Typography>
              <Typography variant="body1" color="text.secondary">
                No ocupa espacio adicional en tu dispositivo
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default InstallPage;