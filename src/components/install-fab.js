import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import {
  Fab,
  Tooltip,
  Badge,
  Zoom,
} from '@mui/material';
import {
  AddToHomeScreen,
  Download,
} from '@mui/icons-material';

// Función para detectar plataforma
const detectPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = /android/i.test(userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)|Tablet|Silk/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    isIOS,
    isAndroid,
    isMobile,
    isTablet,
    isDesktop,
    platform: isIOS ? 'ios' : isAndroid ? 'android' : isDesktop ? 'desktop' : 'other'
  };
};

const InstallFab = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [platformInfo, setPlatformInfo] = useState({});
  const [ isStandalone, setIsStandalone ] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Obtener la ruta actual
    setCurrentPath(window.location.pathname);

    // Detectar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
      return;
    }

    // Detectar plataforma
    const detectedPlatform = detectPlatform();
    setPlatformInfo(detectedPlatform);

    // SOLO mostrar en móviles y tablets, NO en desktop
    if (detectedPlatform.isMobile || detectedPlatform.isTablet) {
      setIsVisible(true);
    }
  }, []);

  const handleFabClick = () => {
    // Redirigir a la página de instalación
    navigate('/instalar');
  };

  const getTooltipTitle = () => {
    const { isIOS, isAndroid } = platformInfo;
    
    if (isIOS) return "Instalar en iOS";
    if (isAndroid) return "Instalar en Android";
    return "Instalar App";
  };

  const getFabIcon = () => {
    const { isIOS, isAndroid } = platformInfo;
    
    if (isIOS) return <AddToHomeScreen />;
    if (isAndroid) return <Download />;
    return <AddToHomeScreen />;
  };

  const getBadgeColor = () => {
    const { isIOS } = platformInfo;
    
    if (isIOS) return 'info';
    return 'secondary';
  };

   const getAriaLabel = () => {
    return "Dar clic para instalar como aplicación";
  };

  const { isDesktop } = platformInfo;
  const isOnInstallPage = currentPath.includes('/instalar') || currentPath.includes('/about') ? true : false;

  // No mostrar si:
  // 1. Ya está instalada como PWA
  // 2. Es una computadora de escritorio
  // 3. No es visible
  if (isStandalone || isDesktop || !isVisible || isOnInstallPage ) {
    return null;
  }

  return (
    <Zoom in={isVisible}>
      <Tooltip 
        title={getTooltipTitle()} 
        placement="left"
        arrow
      >
        <Fab
          color="primary"
          aria-label={getAriaLabel()}
          onClick={handleFabClick}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            zIndex: 1000,
            '&:hover': {
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Badge 
            color={getBadgeColor()} 
            variant="dot" 
            invisible={!platformInfo.isIOS}
          >
            {getFabIcon()}
          </Badge>
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default InstallFab;