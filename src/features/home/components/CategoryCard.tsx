import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { ROUTES } from "../../../routes/paths";

interface CategoryCardProps {
  name: string;
  icon: string;
  description: string;
}

const CategoryCard = ({
  name,
  icon,
  description,
}: CategoryCardProps): React.ReactElement => {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`${ROUTES.PRODUCTS}?category=${encodeURIComponent(name)}`}
        sx={{ height: "100%" }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            py: 4,
          }}
        >
          <Box
            sx={{
              fontSize: "50px",
              mb: 2,
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
