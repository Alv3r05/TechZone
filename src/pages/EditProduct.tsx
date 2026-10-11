import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loading from "../components/ui/Loading";

import { getProductById, updateProduct } from "../features/products/services/productService";

import { categories } from "../features/products/services/productService";
import { categoryBrands } from "../features/products/productOptions";
import { ROUTES } from "../routes/paths";

import type { Product } from "../types/product";

const EditProduct = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const availableBrands = useMemo<string[]>(() => {
    if (!category) {
      return [];
    }

    return categoryBrands[category] ?? [];
  }, [category]);

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (!id) {
        setError("Product not found.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(Number(id));

        setProduct(data);

        setName(data.name);
        setDescription(data.description ?? "");
        setPrice(String(data.price));
        setStock(String(data.stock));
        setCategory(data.category ?? "");
        setBrand(data.brand ?? "");
      } catch (err: any) {
        console.error(err);

        setError(
          err.response?.data?.message || "Unable to load product.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  const handleCategoryChange = (newCategory: string): void => {
    setCategory(newCategory);

    const brandsForCategory = categoryBrands[newCategory] ?? [];

    if (!brandsForCategory.includes(brand)) {
      setBrand("");
    }
  };

  const handleUpdate = async (): Promise<void> => {
    setError("");

    if (!id) {
      setError("Product not found.");
      return;
    }

    if (!name.trim()) {
      setError("Enter the product name.");
      return;
    }

    if (!description.trim()) {
      setError("Enter a description.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (!stock || Number(stock) <= 0) {
      setError("Stock must be greater than 0.");
      return;
    }

    if (!category) {
      setError("Select a category.");
      return;
    }

    if (!brand) {
      setError("Select a brand.");
      return;
    }

    try {
      setSaving(true);

      await updateProduct(Number(id), {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        category,
        brand,
      });

      navigate(ROUTES.MY_PRODUCTS);
    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to update the product.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <Container maxWidth="md" sx={{ py: 8 }}>
          <Loading />
        </Container>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <Container maxWidth="md" sx={{ py: 6 }}>
          <Alert severity="error">{error || "Product not found."}</Alert>

          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => navigate(ROUTES.MY_PRODUCTS)}
          >
            Back to my products
          </Button>
        </Container>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Edit product
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Update your product information.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: 650,
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Product name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            select
            label="Category"
            value={category}
            onChange={(event) => handleCategoryChange(event.target.value)}
            fullWidth
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            disabled={!category}
            fullWidth
          >
            {availableBrands.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            slotProps={{
              htmlInput: {
                min: 0,
                step: "0.01",
              },
            }}
            fullWidth
          />

          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            slotProps={{
              htmlInput: {
                min: 1,
                step: 1,
              },
            }}
            fullWidth
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate(ROUTES.MY_PRODUCTS)}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={() => void handleUpdate()}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default EditProduct;
