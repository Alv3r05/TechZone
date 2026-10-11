import { Box, Typography } from "@mui/material";

import CartItem from "./CartItem";

interface CartProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartListProps {
  products: CartProduct[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartList = ({
  products,
  onIncrease,
  onDecrease,
  onRemove,
}: CartListProps): React.ReactElement => {
  if (products.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Your cart is empty
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add products to start your purchase.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {products.map((product) => (
        <CartItem
          key={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          quantity={product.quantity}
          onIncrease={() => onIncrease(product.id)}
          onDecrease={() => onDecrease(product.id)}
          onRemove={() => onRemove(product.id)}
        />
      ))}
    </Box>
  );
};

export default CartList;
