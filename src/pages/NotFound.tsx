import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Link } from "react-router-dom";

import { ROUTES } from "../routes/paths";

const NotFound = (): React.ReactElement => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 80,
          color: "text.secondary",
          mb: 2,
        }}
      />

      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Page not found
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>

      <Button component={Link} to={ROUTES.HOME} variant="contained" size="large">
        Back to home
      </Button>
    </Box>
  );
};

export default NotFound;
