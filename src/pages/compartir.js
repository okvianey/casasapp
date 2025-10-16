import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Link as LinkIcon,
} from '@mui/icons-material';

const ShareCard = () => {
  const appUrl = 'https://casas.flatlatte.com';
  const shareMessage = '¡Mira esta app de letras canciones bíblicas! Casas - Cantemos juntos';
  
  // Generar URL para QR (puedes usar un servicio como QR Code Generator)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(appUrl)}`;

  const handleShare = (platform) => {
    const text = encodeURIComponent(shareMessage);
    const url = encodeURIComponent(appUrl);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      instagram: `https://instagram.com/intent/tweet?text=${text}&url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      alert('¡Enlace copiado al portapapeles!');
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        margin: '20px auto',
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        {/* Título */}
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          ¿Te gusta la app?
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Compártela con tus amigos y canten juntos
        </Typography>

        {/* Botones de compartir */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          <IconButton 
            onClick={() => handleShare('whatsapp')}
            sx={{ 
              backgroundColor: '#25D366', 
              color: 'white',
              '&:hover': { backgroundColor: '#128C7E' }
            }}
          >
            <WhatsApp />
          </IconButton>
          
          <IconButton 
            onClick={() => handleShare('facebook')}
            sx={{ 
              backgroundColor: '#1877F2', 
              color: 'white',
              '&:hover': { backgroundColor: '#0f5fc9ff' }
            }}
          >
            <Facebook />
          </IconButton>
          
          <IconButton 
            onClick={() => handleShare('instagram')}
            sx={{ 
              backgroundColor: '#e4683bff', 
              color: 'white',
              '&:hover': { backgroundColor: '#da4d1aff' }
            }}
          >
            <Instagram />
          </IconButton>
          
          <IconButton 
            onClick={copyToClipboard}
            sx={{ 
              backgroundColor: 'grey.500', 
              color: 'white',
              '&:hover': { backgroundColor: 'grey.600' }
            }}
          >
            <LinkIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" color="text.secondary">
            o escanea el código
          </Typography>
        </Divider>

        {/* Código QR */}
        <Box sx={{ textAlign: 'center' }}>
          <img 
            src={qrCodeUrl} 
            alt="Código QR para compartir la app"
            style={{ 
              width: 150, 
              height: 150,
              border: '1px solid #e0e0e0',
              borderRadius: 8
            }}
          />
          <Typography 
            variant="caption" 
            display="block" 
            sx={{ mt: 1, color: 'text.secondary' }}
          >
            Escanea para abrir la app
          </Typography>
        </Box>

        {/* Enlace directo */}
        <Box 
          sx={{ 
            mt: 2,
            p: 1,
            // backgroundColor: 'grey.50',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              fontSize: '0.75rem'
            }}
          >
            {appUrl}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShareCard;