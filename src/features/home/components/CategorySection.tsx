import { Box, Container, Grid, Typography } from "@mui/material";

import CategoryCard from "./CategoryCard";

interface Category {
  name: string;
  icon: string;
  description: string;
}

const categories: Category[] = [
  {
    name: "Laptops",
    icon: "💻",
    description: "Laptops for work, study and gaming",
  },
  {
    name: "Video Games",
    icon: "🎮",
    description: "Everything to boost your gaming experience",
  },
  {
    name: "Monitors",
    icon: "🖥️",
    description: "Monitors for gaming and productivity",
  },
  {
    name: "Peripherals",
    icon: "⌨️",
    description: "Keyboards, mice, headphones and more",
  },
];

const CategorySection = (): React.ReactElement => {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: "#F8FAFC",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", color: "text.primary" }}
            gutterBottom
          >
            Explore our categories
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Find the technology you need
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.name}>
              <CategoryCard
                name={category.name}
                icon={category.icon}
                description={category.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategorySection;
