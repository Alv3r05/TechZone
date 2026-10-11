import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  onCheckout: () => void;
  checkoutDisabled?: boolean;
}

const CartSummary = ({
  subtotal,
  shipping,
  onCheckout,
  checkoutDisabled = false,
}: CartSummaryProps): React.ReactElement => {
  const total = subtotal + shipping;
  const [loading, setLoading] = useState<boolean>(false);

  const handleProcess = async (): Promise<void> => {
    setLoading(true);
    try {
      await onCheckout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
        Order summary
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography color="text.secondary">Subtotal</Typography>

        <Typography>S/ {Number(subtotal).toFixed(2)}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography color="text.secondary">Shipping</Typography>

        <Typography>S/ {Number(shipping).toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          S/ {Number(total).toFixed(2)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleProcess}
        disabled={loading || checkoutDisabled}
      >
        {loading ? "Processing..." : "Proceed to payment"}
      </Button>
    </Paper>
  );
};

export default CartSummary;
