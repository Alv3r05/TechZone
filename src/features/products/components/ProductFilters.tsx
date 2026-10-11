import { useMemo } from "react";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";

import { categories } from "../services/productService";
import { categoryBrands } from "../productOptions";

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;

  priceRange: number[];
  setPriceRange: (range: number[]) => void;

  onlyAvailable: boolean;
  setOnlyAvailable: (value: boolean) => void;
}

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  onlyAvailable,
  setOnlyAvailable,
}: ProductFiltersProps): React.ReactElement => {
  const brands = useMemo<string[]>(() => {
    if (selectedCategory) {
      return categoryBrands[selectedCategory] ?? [];
    }

    const all = Object.values(categoryBrands).flat();

    return Array.from(new Set(all));
  }, [selectedCategory]);

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);

    setSelectedBrands([]);
  };

  const handleBrandChange = (brand: string, checked: boolean): void => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Filters
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Category
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>Category</InputLabel>

        <Select
          label="Category"
          value={selectedCategory}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <MenuItem value="">All</MenuItem>

          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Price
      </Typography>

      <Slider
        value={priceRange}
        onChange={(_, newValue) => {
          if (Array.isArray(newValue)) {
            setPriceRange(newValue);
          }
        }}
        min={0}
        max={5000}
        step={50}
        valueLabelDisplay="auto"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2">S/ {priceRange[0]}</Typography>

        <Typography variant="body2">S/ {priceRange[1]}</Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Brand
      </Typography>

      {brands.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No brands available for this category.
        </Typography>
      ) : (
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={(event) =>
                    handleBrandChange(brand, event.target.checked)
                  }
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Availability
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={onlyAvailable}
            onChange={(event) => setOnlyAvailable(event.target.checked)}
          />
        }
        label="Only available products"
      />
    </Box>
  );
};

export default ProductFilters;
