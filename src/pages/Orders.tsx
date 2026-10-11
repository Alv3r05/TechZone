import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import EmptyState from "../components/ui/EmptyState";

import { getOrders } from "../features/orders/services/orderService";
import type { Order } from "../features/orders/services/orderService";
import { ROUTES } from "../routes/paths";

const Orders = (): React.ReactElement => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async (): Promise<void> => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err: any) {
        console.error("Error fetching orders:", err);

        setError(
          err.response?.data?.message || "Unable to load your orders.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadOrders();
  }, []);

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
            My orders
          </Typography>

          {loading && <Loading />}

          {!loading && error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && orders.length === 0 && (
            <EmptyState
              title="You have no orders yet"
              message="When you make a purchase, it will appear here."
              buttonText="View products"
              onAction={() => navigate(ROUTES.PRODUCTS)}
            />
          )}

          {!loading && !error && orders.length > 0 && (
            <Stack spacing={2}>
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          Order #{order.id}
                        </Typography>

                        <Typography color="text.secondary">
                          {new Date(order.created_at).toLocaleString()}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {order.status}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      User: #{order.user_id}
                    </Typography>

                    <Button
                      variant="outlined"
                      onClick={() => navigate(ROUTES.ORDER_DETAIL(order.id))}
                    >
                      View details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Orders;
