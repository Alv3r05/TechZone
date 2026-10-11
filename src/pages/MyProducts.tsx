import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import { deleteProduct, getMyProducts } from "../features/products/services/productService";

import { ROUTES } from "../routes/paths";

import type { Product } from "../types/product";

const MyProducts = (): React.ReactElement => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProducts();

      setProducts(data);
    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to load your products.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      setDeletingId(id);
      setError("");

      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to delete the product.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleConfirmDelete = (): void => {
    if (deleteId === null) {
      return;
    }

    const id = deleteId;
    setDeleteId(null);
    void handleDelete(id);
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Loading />
        </Container>

        <Footer />
      </>
    );
  }

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
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
          }}
        >
          My products
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Manage the products you are selling.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {products.length === 0 ? (
          <EmptyState
            title="You have no published products"
            message="Publish your first product to start selling."
            buttonText="Sell product"
            onAction={() => navigate(ROUTES.SELL_PRODUCT)}
          />
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid
                key={product.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {product.category || "No category"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Brand: {product.brand || "No brand"}
                    </Typography>

                    <Typography variant="h6" sx={{ mb: 1 }}>
                      S/ {Number(product.price).toFixed(2)}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Stock: {product.stock}
                    </Typography>

                    {product.description && (
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    )}
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      p: 2,
                      pt: 0,
                    }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(ROUTES.EDIT_PRODUCT(product.id))}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => setDeleteId(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? "Deleting..." : "Delete"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      <Footer />
    </>
  );
};

export default MyProducts;
