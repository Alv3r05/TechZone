import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { ROUTES } from "../../../routes/paths";

const Hero = (): React.ReactElement => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0F172A, #1E3A5F)",
        minHeight: { xs: "auto", md: "450px" },
        py: { xs: 6, md: 0 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.75rem" },
              }}
            >
              Technology to take you further
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#CBD5E1",
                mb: 4,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Find laptops, components, peripherals and everything you
              need to power up your experience.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                component={RouterLink}
                to={ROUTES.PRODUCTS}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#22C55E",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#16A34A",
                  },
                }}
              >
                View products
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: "white",
                  borderColor: "white",
                  px: 4,
                }}
              >
                View deals
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: 200, md: 350 },
              height: { xs: 180, md: 300 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "100px", md: "150px" },
            }}
          >
            💻
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
