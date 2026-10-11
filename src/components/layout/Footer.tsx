import { Box, Container, Grid, Link, Typography, Divider } from "@mui/material";

const Footer = (): React.ReactElement => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0F172A",
        color: "white",
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: 6 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              TECHZONE
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#CBD5E1",
                lineHeight: 1.7,
              }}
            >
              Your online technology store. Find laptops, components,
              peripherals and much more.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Shop
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Link href="#" color="inherit" underline="hover">
                Products
              </Link>

              <Link href="#" color="inherit" underline="hover">
                Categories
              </Link>

              <Link href="#" color="inherit" underline="hover">
                Deals
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Help
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Link href="#" color="inherit" underline="hover">
                Frequently asked questions
              </Link>

              <Link href="#" color="inherit" underline="hover">
                Terms and conditions
              </Link>

              <Link href="#" color="inherit" underline="hover">
                Privacy policy
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Contact us
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#CBD5E1",
                mb: 1,
              }}
            >
              📧 contact@techzone.com
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#CBD5E1",
                mb: 1,
              }}
            >
              📱 +51 999 999 999
            </Typography>

            <Typography variant="body2" sx={{ color: "#CBD5E1" }}>
              📍 Lima, Peru
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#334155" }} />

        <Box
          sx={{
            py: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#94A3B8" }}>
            © 2026 TECHZONE. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
