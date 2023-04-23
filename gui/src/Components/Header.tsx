import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  Drawer,
  Box,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerMenu = () => {
  return (
    <>
      <Box sx={{ width: 250 }} role="presentation">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Typography variant="h5">
            <br />
            <Link href="/" color="inherit" underline="none">
              ホーム
            </Link>
            <hr />
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

const HamBurgerMenu = () => {
  const [didOpen, setDidOpen] = React.useState(false);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ ml: "auto" }}
        onClick={() => setDidOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={didOpen} onClose={() => setDidOpen(false)}>
        <DrawerMenu />
      </Drawer>
    </>
  );
};

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            <Link href="/" color="inherit" underline="none">
              Take Rail
            </Link>
          </Typography>
          <HamBurgerMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
