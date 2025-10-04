import React, { useState } from 'react';
import { navigate } from "gatsby";
import {
  Autocomplete,
  TextField
} from "@mui/material";
import hymnsList from "../assets/hymnsList.json";

export default function ComboBox({ handleSearch }) {
  const [ selectedOption, setSelectedOption ] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedOption) {
      navigate(`/cancion/${selectedOption.frontmatter.slug}`);
    }
  };

  const handleSelection = (e, value) => {
    if (value) {
      setSelectedOption(value); 
      navigate(`/cancion/${value.frontmatter.slug}`);
    }
  };
  
  return (
    <Autocomplete
      // disablePortal
      id="combo-box-demo"
      size='small'
      noOptionsText="Canción no encontrada"
      options={hymnsList}
      clearIcon={null}
      getOptionLabel={(option)=> option.frontmatter.title || ""}
      sx={{ width: 300 }}
      onChange={handleSelection}
      renderInput={(params) => <TextField {...params} label="Buscar canción" onKeyDown={handleKeyDown} />}
    />
  );
}
