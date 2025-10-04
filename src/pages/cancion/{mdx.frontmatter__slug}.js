import React from 'react';
import { graphql, Link } from 'gatsby'
import { useLocation } from "@reach/router";
import Layout from '../../components/layout';
// import Seo from '../../components/seo';

import {
  Box,
  Typography,
  // Paper,
  Fab,
} from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const HimnoPage = ({ data, children }) => {

  const location = useLocation();
  const hasNumber = /\d+/;
  const hymnNumber = location.pathname.match(hasNumber);
  const page = parseInt(hymnNumber);


  return (
    <Layout color="inherit">
      <Typography variant="h1" align="center" gutterBottom>
        {data.mdx.frontmatter.title}
      </Typography>

      <Box
        color="inherit"
        align="center"
        sx={{
          padding: "0 2px",
          margin: "0 auto",
          maxWidth: "400px",
          textAlign: "center",
          'ol': {
            margin: '5px 0',
            paddingInlineStart: '10px',
          },

        }} >

        {children}

        <Box
          color="inherit"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
            bottom: "95px",
            left: "0",
            zIndex: "800",
            width: "100%",
            padding: "0 5px"
          }}>
          
        </Box>

      </Box>
    </Layout>
  );
};

export const query = graphql`
query ($id: String = "id") {
  mdx(id: {eq: $id}) {
    frontmatter {
      slug
      title
    }
  }
}
`

// export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />
export default HimnoPage;