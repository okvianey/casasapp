import React from 'react';
import {
  graphql,
  // Link
} from 'gatsby'
import Layout from '../../components/layout';
import FullscreenLyrics from '../../components/fullscreenLyrics';
import {
  Box,
  Typography
  // Paper,
  // Fab,
} from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FullPageFab from '../../components/fullPageFab';

const HimnoPage = ({ data, children }) => {

  // const location = useLocation();
  // const hasNumber = /\d+/;
  // const hymnNumber = location.pathname.match(hasNumber);
  // const page = parseInt(hymnNumber);


  return (
    <Layout color="inherit">
      <Box sx={{ display: "flex", justifyContent: "center", margin: "0 auto" }}>
        <Typography variant="h1" align="center" gutterBottom>
          {data.mdx.frontmatter.title}
        </Typography>

      </Box>
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
          <FullPageFab lyrics={children} />
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