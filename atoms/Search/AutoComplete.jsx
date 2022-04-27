import React, { useCallback, useState, useRef } from "react";

import PropTypes from "prop-types";

import { TextField, IconButton, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import useStyles from "./styles";

const AutoComplete = ({ uniKey, children, onInputValueChange }) => {
  const input = useRef();
  const classes = useStyles();

  const [{ isOpen }, setState] = useState({
    isOpen: false,
  });
  const closeMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);
  const toggleMenu = useCallback((event) => {
    event.stopPropagation();
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const handleInputValueChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (typeof onInputValueChange === "function") {
        onInputValueChange(value);
      }
    },
    [onInputValueChange]
  );

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div>
        <TextField
          inputRef={input}
          fullWidth
          placeholder="Search"
          variant="outlined"
          InputProps={{
            className: classes.input,
            endAdornment: (
              <IconButton onClick={toggleMenu}>
                <SearchIcon />
              </IconButton>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onClick={() => setState((prev) => ({ ...prev, isOpen: true }))}
          onChange={handleInputValueChange}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMenu();
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: (theme) => theme.colors.blue,
              },
            },
            "& .MuiOutlinedInput-root": {
              "& .Mui-focused": {
                borderColor: (theme) => theme.colors.blue,
              },
            },
            "& .MuiFormLabel-root": {
              color: (theme) => theme.colors.mono4,
              "& .Mui-focused": {
                color: (theme) => theme.colors.blue,
              },
            },
          }}
        />

        {typeof children === "function" &&
          children({
            isOpen,
            anchorEl: input.current,
            uniKey,
            toggleMenu,
          })}
      </div>
    </ClickAwayListener>
  );
};

AutoComplete.propTypes = {
  uniKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onInputValueChange: PropTypes.func.isRequired,
};

export default AutoComplete;
