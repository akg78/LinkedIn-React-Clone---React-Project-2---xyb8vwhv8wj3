"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import "./Navbar.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logo, navPages, user, usersProfile } from "../(Constants)/Assets";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { context } from "../layout";
import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function Navbar() {
  const { show, setshow } = useContext(context);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [token, setToken] = useState();
  const [localStorageValue, setLocalStorageValue] = useState();


  // const [loginShow, setLoginShow] = useState(false);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      //   vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "28ch",
        },
      },
    },
  }));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
  };

  const [theme, setTheme] = useState("light-theme");

  const toggleTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  };

  useEffect(()=>{
    const value = localStorage.getItem("name")
    setLocalStorageValue(value)
}, [])

  return (
    <>
      {show && (
        // <Box sx={{display: "flex", justifyContent:"center", width: "100vw", overflowY: "hidden"}}>
        <Container maxWidth="xl" sx={{ display: "flex" }}>
          <Toolbar
            disableGutters
            sx={{
              scale: "0.90",
              width: "83.2%",
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <Box
              sx={{
                scale: "1.8",
                cursor: "pointer",
                height: "21px",
                mb: "7px",
              }}
            >
              <Link href="/Home">{logo}</Link>
            </Box>

            <Box sx={{ ml: "10px" }}>
              <Search sx={{ height: "40px", backgroundColor: "#edf3f8" }}>
                <SearchIconWrapper sx={{ scale: "0.90", color: "#000000de" }}>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  sx={{ scale: "1", color: "#000000de" }}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {navPages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.home}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Box
              sx={{
                height: "30px",
                color: "#00000099",
                ml: "189px",
                mr: "30px",
                mb: "12px",
                flexGrow: 0.1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {navPages.map((page) => (
                <Box key={page} onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "#00000099" }}
                    href={`/${page.link}`}
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        width: "100px",
                        fontSize: "13px",
                        ":hover": { color: "black" },
                        letterSpacing: ".1rem",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {page.svg}
                      {page.name}
                    </Box>
                  </Link>
                </Box>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Me">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
                  <Avatar>
                    {localStorage.getItem("name")
                      ? `${JSON.parse(localStorage.getItem("name"))
                          .slice(0, 1)
                          .toUpperCase()}`
                      : ""}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {usersProfile.map((showuser) => (
                <MenuItem key={showuser} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{show.user}</Typography>
                </MenuItem>
              ))} */}
                <MenuItem
                  sx={{ height: "300px", width: "240px" }}
                  disableRipple
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      // border: "1px solid red"
                    }}
                  >
                    <div className="flex flexa g10 navuserwrap">
                      <span>
                        <Avatar>
                          {localStorageValue
                            ? `${JSON.parse(localStorageValue)
                                .slice(0, 1)
                                .toUpperCase()}`
                            : ""}
                        </Avatar>
                      </span>
                      <p>
                        {localStorageValue
                          ? `${
                              JSON.parse(localStorageValue)
                                .charAt(0)
                                .toUpperCase() +
                              JSON.parse(localStorageValue).slice(1)
                            }`
                          : ""}
                      </p>
                    </div>

                    <Link
                      style={{
                        textDecoration: "none",
                        color: " black",
                        border: "2px solid #0a66c2",
                        borderRadius: "50px",
                        width: "100%",
                        textAlign: "center",
                        color: "#0a66c2",
                        fontWeight: "600",
                      }}
                      href="MyProfile"
                    >
                      View Profile
                    </Link>
                    <span className="hrCreatePost"></span>
                    <Link
                      style={{ textDecoration: "none", color: " black" }}
                      href="TryPremium"
                    >
                      Try Premium
                    </Link>

                    {/* dark toggle */}

                    <FormControlLabel
                      sx={{ scale: "0.9" }}
                      onClick={() => {
                        toggleTheme();
                      }}
                      control={
                        <MaterialUISwitch
                          sx={{ m: 1 }}
                          defaultChecked
                          disableRipple
                        />
                      }
                      label="Dark"
                    />

                    {/* dark toggle */}

                    <Link
                      onClick={() => {
                        handleSignOut();
                      }}
                      style={{ textDecoration: "none", color: " black" }}
                      href="/login"
                    >
                      Sign Out
                    </Link>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        // </Box>
      )}{" "}
    </>
  );
}
export default Navbar;
