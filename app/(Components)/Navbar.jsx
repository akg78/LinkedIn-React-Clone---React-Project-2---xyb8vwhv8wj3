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
import {context} from "../layout"



// const settings = ["Profile", "Try Premium", "Dark Mode", "Sign Out"];

function Navbar() {
  const {show,setshow}=useContext(context);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navbarShow, setNavbarShow] = useState(false);

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



  
  return (

    <>{ show &&
    <AppBar position="fixed">
      <Container maxWidth="xl" className="boxxx" >
        <Toolbar 
          disableGutters
          sx={{
            scale: "0.90",
            width: "83%",
          }}
        >
          <Box sx={{ scale: "1.8", cursor: "pointer", height: "21px", mb: "7px" }}>
            <Link href="/">{logo}</Link>
          </Box>

          <Box sx={{ ml: "10px"}}>
            <Search sx={{ height: "40px", backgroundColor: "#edf3f8" }}>
              <SearchIconWrapper sx={{ scale: "0.90", color: "#000000de" }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ scale: "1" , color: "#000000de"}}
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
          <Box sx={{ height: "30px", color: "#00000099", ml: "189px", mr: "30px", mb: "12px", flexGrow: 0.1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((page) => (
              <Box
                key={page}
                onClick={handleCloseNavMenu}
                // sx={{ my: 2, color: "white", display: "block", height: "0px"  }}
              >
                <Link href={`/  ${page.link}`}></Link>
                <Box
                  sx={{
                    cursor: "pointer",
                    width: "100px",
                    fontSize: "14px",
                    ":hover":{color: "black"},
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
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Me">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", }}
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
              {usersProfile.map((showuser) => (
                <MenuItem key={showuser} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{show.user}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    } </>
  );
}
export default Navbar;
