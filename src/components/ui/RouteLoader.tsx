import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

interface RouteLoaderProps {
  children: React.ReactNode;
  delay?: number;
}

const RouteLoader = ({
  children,
  delay = 300,
}: RouteLoaderProps): React.ReactElement => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [location.pathname, delay]);

  if (loading) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress thickness={10} />
        </Box>
    )
  }

  return <>{children}</>;
};

export default RouteLoader;
