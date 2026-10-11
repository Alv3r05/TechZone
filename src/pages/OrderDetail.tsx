import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loading from "../components/ui/Loading";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import { getOrderById, deleteOrder } from "../features/orders/services/orderService";
import type { Order } from "../features/orders/services/orderService";
import { ROUTES } from "../routes/paths";

const OrderDetail = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationOrder = (location.state as { order?: Order } | null)?.order;
  const initialOrder =
    navigationOrder?.id === Number(id) && Array.isArray(navigationOrder.items)
      ? navigationOrder
      : null;

  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [loading, setLoading] = useState(initialOrder === null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const loadOrder = async (): Promise<void> => {
      if (!id) {
        setError("Invalid order.");
        setLoading(false);
        return;
      }

      if (
        navigationOrder?.id === Number(id) &&
        Array.isArray(navigationOrder.items)
      ) {
        setOrder(navigationOrder);
        setError("");
        setLoading(false);
        return;
      }

      setOrder(null);
      setError("");
      setLoading(true);

      try {
        const data = await getOrderById(Number(id));
        setOrder(data);
      } catch (err: any) {
        console.error("Error fetching order:", err);

        setError(err.response?.data?.message || "Unable to fetch the order.");
      } finally {
        setLoading(false);
      }
    };

    void loadOrder();
  }, [id, navigationOrder]);

  const handleDeleteOrder = async (): Promise<void> => {
    if (!id) {
      setError("Invalid order.");
      return;
    }

    try {
      setDeleting(true);
      await deleteOrder(Number(id));
      navigate(ROUTES.ORDERS);
    } catch (err: any) {
      console.error("Error deleting order:", err);
      setError(err.response?.data?.message || "Unable to delete the order.");
      setDeleting(false);
    }
  };

  const total =
    order?.items?.reduce(
      (sum, item) => sum + Number(item.price_at_purchase) * item.quantity,
      0,
    ) ?? 0;

  return (
    <>
      <Navbar />

      <main>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 4,
              color: "text.primary",
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
            }}
          >
            Order details
          </Typography>

          {loading && <Loading />}

          {!loading && error && <Alert severity="error">{error}</Alert>}

          {!loading && order && (
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Order #{order.id}
                  </Typography>

                  <Typography>Status: {order.status}</Typography>

                  <Typography color="text.secondary">
                    Date: {new Date(order.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Products
                  </Typography>

                  <Stack spacing={2}>
                    {order.items?.map((item) => (
                      <Box key={item.id}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {item.product_name ||
                                `Product #${item.product_id}`}
                            </Typography>

                            <Typography color="text.secondary">
                              Quantity: {item.quantity}
                            </Typography>

                            <Typography color="text.secondary">
                              Price: S/{" "}
                              {Number(item.price_at_purchase).toFixed(2)}
                            </Typography>
                          </Box>

                          <Typography sx={{ fontWeight: "bold" }}>
                            S/{" "}
                            {(
                              Number(item.price_at_purchase) * item.quantity
                            ).toFixed(2)}
                          </Typography>
                        </Box>

                        <Divider sx={{ mt: 2 }} />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Total</Typography>

                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      S/ {total.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Box>
                <Button
                  variant="contained"
                  onClick={() => navigate(ROUTES.PRODUCTS)}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Continue shopping
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setConfirmOpen(true)}
                  sx={{ alignSelf: "flex-start", ml: 2 }}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete order"}
                </Button>
              </Box>
            </Stack>
          )}
        </Container>
      </main>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => {
          setConfirmOpen(false);
          void handleDeleteOrder();
        }}
        onCancel={() => setConfirmOpen(false)}
      />

      <Footer />
    </>
  );
};

export default OrderDetail;
