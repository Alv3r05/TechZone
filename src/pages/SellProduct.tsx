import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../features/products/services/productService";
import { categories } from "../features/products/services/productService";
import { categoryBrands } from "../features/products/productOptions";
import { ROUTES } from "../routes/paths";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const SellProduct = (): React.ReactElement => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableBrands = category ? categoryBrands[category] || [] : [];

  const handleCreateProduct = async (): Promise<void> => {
    setError("");

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

    try {
      setLoading(true);

      const product = await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        category,
        brand,
      });

      navigate(ROUTES.PRODUCT_DETAIL(product.id));
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Unable to create the product.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Sell product
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Publish your product and let other users buy it.
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
          onChange={(event) => setCategory(event.target.value)}
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
          label="Available stock"
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

        <Button
          variant="contained"
          size="large"
          onClick={handleCreateProduct}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish product"}
        </Button>
      </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SellProduct;
