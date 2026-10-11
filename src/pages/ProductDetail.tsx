import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Typography,
  Chip,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loading from "../components/ui/Loading";

import type { Product } from "../types/product";
import { getProductById } from "../features/products/services/productService";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { addToCart } from "../features/cart/cartSlice";
import { getCategoryIcon } from "../features/products/productOptions";

const ProductDetail = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (!id) {
        setError("Invalid product.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(Number(id));

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = (): void => {
    if (!product || product.stock <= 0) {
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: "",
        quantity: 1,
        stock: product.stock,
        createdBy: product.created_by,
      }),
    );
  };

  const user = useAppSelector((state) => state.auth.user);
  const isOwnProduct = user?.id === product?.created_by;

  if (loading) {
    return (
      <>
        <Navbar />

        <Container sx={{ py: 8 }}>
          <Loading />
        </Container>

        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <Container sx={{ py: 8 }}>
          <Typography variant="h5" color="error">
            {error || "Product not found."}
          </Typography>
        </Container>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: { xs: 3, md: 6 },
          }}
        >
          <Box
            sx={{
              minHeight: { xs: 260, md: 400 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F1F5F9",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: "6rem", md: "8rem" } }}
            >
              {getCategoryIcon(product.category)}
            </Typography>
          </Box>

          <Box>
            {product.category && (
              <Chip label={product.category} sx={{ mb: 2 }} />
            )}

            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "text.primary",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
              }}
            >
              {product.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {product.description || "High-quality tech product."}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", md: "2.125rem" },
              }}
            >
              S/ {Number(product.price).toFixed(2)}
            </Typography>

            <Typography
              color={product.stock > 0 ? "success.main" : "error.main"}
              sx={{ mb: 3 }}
            >
              {product.stock > 0
                ? `${product.stock} units available`
                : "Out of stock"}
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || isOwnProduct}
              fullWidth
              sx={{ maxWidth: { md: 320 } }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default ProductDetail;
