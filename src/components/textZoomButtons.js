import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
} from "@mui/material/";
import {
  TextIncrease,
  TextDecrease,
} from '@mui/icons-material';

const TextZoomButtons = ({
  handleTextSize,
  textSize,
}) => {

  return (
    <Box>
      <ButtonGroup
        size="small"
        color="secondary"
        variant="outlined"
        aria-label="Modifica el tamaño del texto" 
      >
        <Button
          disabled={textSize <= 12}
          onClick={() => handleTextSize("down")}>
            <TextDecrease sx={{ fontSize: "1rem" }} />
        </Button>
        <Button
          disabled={textSize >= 30}
          onClick={() => handleTextSize("up")}
          >
            <TextIncrease sx={{ fontSize: "1rem" }} />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TextZoomButtons;