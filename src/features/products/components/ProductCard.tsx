import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useAppDispatch, useAppSelector } from "../../../store/reduxHooks";
import { addToCart } from "../../cart/cartSlice";
import { getCategoryIcon } from "../productOptions";
import { ROUTES } from "../../../routes/paths";
import type { Product } from "../../../types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isOwnProduct = user?.id === product.created_by;

  const handleAddToCart = (): void => {
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

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F1F5F9",
        }}
      >
        <Typography variant="h2" color="text.secondary">
          {getCategoryIcon(product.category)}
        </Typography>
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              alignSelf: "flex-start",
              mb: 1,
            }}
          />
        )}

        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description || "High-quality tech product."}
        </Typography>

        <Typography
          variant="body2"
          color={product.stock > 0 ? "success.main" : "error.main"}
          sx={{ mb: 1 }}
        >
          {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          S/ {Number(product.price).toFixed(2)}
        </Typography>

        <Stack direction="column" spacing={1} sx={{ mt: "auto" }}>
          <Button
            component={Link}
            to={ROUTES.PRODUCT_DETAIL(product.id)}
            variant="outlined"
            fullWidth
          >
            View product
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isOwnProduct}
          >
            {isOwnProduct
              ? "Your product"
              : product.stock > 0
                ? "Add to cart"
                : "Out of stock"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
