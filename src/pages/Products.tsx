import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

import Navbar from "../components/layout/Navbar";
import ProductSearch from "../features/products/components/ProductSearch";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductSort from "../features/products/components/ProductSort";
import type { SortOption } from "../features/products/components/ProductSort";
import ProductGrid from "../features/products/components/ProductGrid";
import Footer from "../components/layout/Footer";

import { getProducts } from "../features/products/services/productService";
import type { Product } from "../types/product";

const Products = (): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromUrl);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);

  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);

    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchesBrand =
        selectedBrands.length === 0 ||
        (product.brand !== null && selectedBrands.includes(product.brand));

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText);

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesAvailability = !onlyAvailable || product.stock > 0;

      return (
        matchesCategory &&
        matchesBrand &&
        matchesSearch &&
        matchesPrice &&
        matchesAvailability
      );
    });
  }, [
    products,
    selectedCategory,
    selectedBrands,
    search,
    priceRange,
    onlyAvailable,
  ]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sort) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);

      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);

      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case "relevance":
      default:
        return sorted;
    }
  }, [filteredProducts, sort]);

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            color: "text.primary",
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
          }}
        >
          Products
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Find the technology you need.
        </Typography>

        <ProductSearch value={search} onChange={setSearch} />

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFiltersOpen(true)}
          >
            Filters
          </Button>

          <ProductSort value={sort} onChange={setSort} />
        </Box>

        <Grid container spacing={4} sx={{ mt: { xs: 2, md: 2 } }}>
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <ProductFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onlyAvailable={onlyAvailable}
              setOnlyAvailable={setOnlyAvailable}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                mb: 3,
              }}
            >
              <ProductSort value={sort} onChange={setSort} />
            </Box>

            <ProductGrid
              products={sortedProducts}
              loading={loading}
              error={error}
            />
          </Grid>
        </Grid>
      </Container>

      <Drawer
        anchor="left"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      >
        <Box sx={{ width: { xs: "85vw", sm: 340 }, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>

            <IconButton onClick={() => setFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
          />
        </Box>
      </Drawer>

      <Footer />
    </>
  );
};

export default Products;
