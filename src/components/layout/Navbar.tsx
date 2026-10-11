import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { logout } from "../../features/auth/authSlice";
import { selectCartQuantity } from "../../features/cart/cartSlice";
import { ROUTES } from "../../routes/paths";

const Navbar = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector(
    (state) => state.auth.user !== null && state.auth.token !== null,
  );
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleLogout = (): void => {
    dispatch(logout());
    navigate(ROUTES.HOME);
    setDrawerOpen(false);
  };

  const cartQuantity = useAppSelector(selectCartQuantity);

  const navLinks = [
    { label: "Products", to: ROUTES.PRODUCTS },
    { label: "Sell product", to: ROUTES.SELL_PRODUCT },
    { label: "My Products", to: ROUTES.MY_PRODUCTS },
    ...(isAuthenticated ? [{ label: "My orders", to: ROUTES.ORDERS }] : []),
  ];

  const authLinks = isAuthenticated
    ? []
    : [
        { label: "Sign in", to: ROUTES.LOGIN },
        { label: "Sign up", to: ROUTES.REGISTER },
      ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={ROUTES.HOME}
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            TechZone
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                color="inherit"
                component={Link}
                to={link.to}
              >
                {link.label}
              </Button>
            ))}

            {isAuthenticated ? (
              <>
                <Typography
                  sx={{
                    mx: 2,
                    display: { xs: "none", lg: "block" },
                  }}
                >
                  Hello, {user?.username}
                </Typography>

                <Button color="inherit" onClick={handleLogout}>
                  Sign out
                </Button>
              </>
            ) : (
              authLinks.map((link) => (
                <Button
                  key={link.to}
                  color="inherit"
                  component={Link}
                  to={link.to}
                >
                  {link.label}
                </Button>
              ))
            )}
          </Box>

          <Button
            color="inherit"
            component={Link}
            to={ROUTES.CART}
            startIcon={<ShoppingCartIcon />}
            sx={{ ml: { xs: "auto", md: 0 } }}
          >
            {cartQuantity > 0 && ` (${cartQuantity})`}
          </Button>

          <IconButton
            color="inherit"
            edge="end"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260 }} role="presentation">
          {isAuthenticated && (
            <>
              <Box sx={{ px: 2, py: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Hello, {user?.username}
                </Typography>
              </Box>
              <Divider />
            </>
          )}

          <List>
            {navLinks.map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.to}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            {isAuthenticated ? (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Sign out" />
                </ListItemButton>
              </ListItem>
            ) : (
              authLinks.map((link) => (
                <ListItem key={link.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={link.to}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
