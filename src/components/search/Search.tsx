import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchTerm,
  selectSearchTerm,
  setSearchTerm,
} from "./searchSlice";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const CloseIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "18ch",
    },
  },
}));

const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const onSearchTermClearHandler = () => {
    dispatch(clearSearchTerm());
  };
  return (
    <SearchBar>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        value={searchTerm}
        onChange={onSearchChangeHandler}
        inputProps={{ "aria-label": "search" }}
      />

      {searchTerm.length > 0 && (
        <CloseIconWrapper>
          <CloseIcon
            onClick={onSearchTermClearHandler}
            id="search-clear-button"
          />
        </CloseIconWrapper>
      )}
    </SearchBar>
  );
};

export default Search;
