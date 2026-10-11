import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

interface CartItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({
  name,
  image,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps): React.ReactElement => {
  const total = price * quantity;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 1,
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: 100,
          height: 100,
          objectFit: "contain",
          borderRadius: 1,
        }}
      />

      <CardContent
        sx={{
          flex: 1,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          S/ {Number(price).toFixed(2)} each
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={onDecrease}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>

          <Typography
            sx={{
              mx: 2,
              fontWeight: "bold",
            }}
          >
            {quantity}
          </Typography>

          <IconButton size="small" onClick={onIncrease}>
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          pr: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          S/ {Number(total).toFixed(2)}
        </Typography>

        <IconButton color="error" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CartItem;
