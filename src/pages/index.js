import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SearchBar from "../components/searchBar";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import hymnsList from "../assets/hymnsList.json";

const StyledSearchBox = styled("div")(({ theme }) => ({
  padding: 20,
  border: "1px dashed grey",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  [ theme.breakpoints.down("sm") ]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const IndexPage = () => {
  const [ input, setInput ] = useState("");
  const [ himnario, setHimnario ] = useState(hymnsList);

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const filterHymns = (searchText) => {
    if (!hymnsList || !Array.isArray(hymnsList)) {
      return []; // Devuelve un array vacío si hymnsList no es válido
    }
  
    if (searchText.trim() === "") {
      return hymnsList; // Devuelve la lista completa si no hay texto de búsqueda
    }
  
    const searchTextUpper = searchText.toUpperCase();
    return hymnsList.filter((cancion) =>
      cancion.frontmatter.title.toUpperCase().includes(searchTextUpper)
    );
  };

  useEffect(() => {
    const filteredHymns = filterHymns(input);
    setHimnario(filteredHymns || []);
  }, [input]);


  return (
    <Layout>
      <Box>
        <StyledSearchBox>
          <Typography variant="h1" mb={2}> Buscar: </Typography>
          <SearchBar handleSearch={handleInput} />
        </StyledSearchBox>

        <List sx={{ overflow: "auto" }}>
          {himnario.map((node) => {
            const keyId = node.id;

            if (node.frontmatter.slug === "0") {
              return null; // No renderizar nada si el slug es "0"
            }

            return (
              <ListItem key={keyId} disablePadding divider>
                <ListItemButton
                  color="inherit"
                  component={Link}
                  to={`/cancion/${node.frontmatter.slug}`}
                >
                  {node.frontmatter.title}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

      </Box>
    </Layout>
  );
};

// export const Head = () => <Seo title="Himnario" />;
export default IndexPage;
