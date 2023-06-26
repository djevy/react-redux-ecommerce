import React, { useState } from "react";
import MenswearLogo from "../../images/MenswearLogo.png"
import { useSelector } from "react-redux";
import "./navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import Search from "../search/Search";

import Favorites from "../favorites/Favorites";
import { selectFavoriteProducts } from "../favorites/favoriteProductsSlice";
import Cart from "../cart/Cart";
import { selectCartProducts } from "../cart/cartSlice";

const Navbar = () => {
  const favoriteProductsLength = useSelector(selectFavoriteProducts).length;
  const cartProductsLength =useSelector(selectCartProducts).length;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  type Draw = "menu" | "cart" | "favorite";

  const [drawState, setDrawState] = useState({
    menu: false,
    favorite: false,
    cart: false,
  });

  const toggleDrawer =
    (draw: Draw, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawState({ ...drawState, [draw]: open });
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#193048" }} id="navbar">
        <Toolbar
          sx={{ display: { xs: "none", sm: "flex" } }}
          id="navbar-content"
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("menu", true)}
          >
            <MenuIcon />
          </IconButton>
          <img src={MenswearLogo} className="menswear-logo" alt="Menswear logo"/>
          <Typography
            variant="h5"
            component="h1"
            sx={{ display: { sm: "block" } }}
          >
            <Link to={"/"}>Menswear</Link>
          </Typography>
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show number of favorite items "
              color="inherit"
              onClick={toggleDrawer("favorite", true)}
            >
              <Badge badgeContent={favoriteProductsLength} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show number of items in the cart"
              color="inherit"
              onClick={toggleDrawer("cart", true)}
            >
              <Badge badgeContent={cartProductsLength} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Nav */}
        <Toolbar
          sx={{
            display: { xs: "flex", sm: "none" },
            flexWrap: "wrap",
            background: "#193048",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("menu", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h1"
            sx={{ display: { sm: "block" } }}
          >
            <Link to={"/"}>Menswear</Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" }, margin: "auto" }}>
            <IconButton
              size="large"
              aria-label="show number of favorite items "
              color="inherit"
              onClick={toggleDrawer("favorite", true)}
            >
              <Badge badgeContent={favoriteProductsLength} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show number of items in the cart"
              color="inherit"
              onClick={toggleDrawer("cart", true)}
            >
              <Badge badgeContent={cartProductsLength} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <div id="mobile-search">
            <Search />
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        anchor={"left"}
        open={drawState["menu"]}
        onClose={toggleDrawer("menu", false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer("menu", false)}
          onKeyDown={toggleDrawer("menu", false)}
        >
          <p>Menu Component</p>
        </Box>
      </Drawer>

      <Drawer
        anchor={"right"}
        open={drawState["favorite"]}
        onClose={toggleDrawer("favorite", false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer("favorite", false)}
          onKeyDown={toggleDrawer("favorite", false)}
        >
          <Favorites />
        </Box>
      </Drawer>

      <Drawer
        anchor={"right"}
        open={drawState["cart"]}
        onClose={toggleDrawer("cart", false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer("cart", false)}
          onKeyDown={toggleDrawer("cart", false)}
        >
          <Cart />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
