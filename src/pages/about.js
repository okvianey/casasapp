import React from "react";
import {
  Box,
  Divider,
  Typography,
  CardActionArea,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import Layout from "../components/layout";
import flatlatte from "../images/flatlatte.png";
// import Seo from "../components/seo";

function About() {

  return (
    <Layout>
      <Box>
        <a href="https://flatlatte.com/okvianey" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} aria-label="Ir al sitio de flat latte">
          <Card mb={3} sx={{ textAlign: "center", }}>
            
            <CardActionArea>
              <CardContent>
                {/* <LocalCafeOutlinedIcon fontSize="large" /> */}
                <CardMedia
                  component="img"
                  sx={{ width: 50, margin: "auto", paddingBottom: "10px"}}
                  image={flatlatte}
                  alt="flatlatte logo"
                />
                <Typography variant="h3" >Hecho con café y código por @okvianey </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
        <Divider />
        <a href="https://wa.me/529223400366?text=%C2%A1Hola%" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} aria-label="Ir al sitio de flat latte">
          <Card p={5} sx={{ textAlign: "center",}}>
            <CardActionArea>
              <CardContent>
                <Typography variant="body1" p={4}>Si ves un error o tienes alguna duda escríbenos a <Typography variant="overline">hola@flatlatte.com</Typography> o da click aquí para contactarnos por Whatsapp</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
        <Divider />
        <a href="https://flatlatte.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} aria-label="Ir al sitio de flat latte">
          <Card mb={3} sx={{ textAlign: "center",}}>
            <CardActionArea>
              <CardContent>
                <Typography variant="body1" >www.flatlatte.com</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </Box>

    </Layout>
  )
}

// export const Head = () => <Seo title="Sobre Nosotros" />;
export default About;