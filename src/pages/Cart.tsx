import { useMemo } from "react";
import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartList from "../features/cart/components/CartList";
import CartSummary from "../features/cart/components/CartSummary";

import { createOrder } from "../features/orders/services/orderService";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { ROUTES } from "../routes/paths";

import {
  increaseQuantity as increaseQuantityAction,
  decreaseQuantity as decreaseQuantityAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  selectCartSubtotal,
} from "../features/cart/cartSlice";

const Cart = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.cart.products);
  const subtotal = useAppSelector(selectCartSubtotal);
  const user = useAppSelector((state) => state.auth.user);

  const ownProducts = useMemo(
    () =>
      user
        ? products.filter((product) => product.createdBy === user.id)
        : [],
    [products, user],
  );

  const hasOwnProducts = ownProducts.length > 0;

  const increaseQuantity = (productId: number): void => {
    dispatch(increaseQuantityAction(productId));
  };

  const decreaseQuantity = (productId: number): void => {
    dispatch(decreaseQuantityAction(productId));
  };

  const removeFromCart = (productId: number): void => {
    dispatch(removeFromCartAction(productId));
  };

  const clearCart = (): void => {
    dispatch(clearCartAction());
  };

  const removeOwnProducts = (): void => {
    ownProducts.forEach((product) => {
      dispatch(removeFromCartAction(product.id));
    });
  };

  const isAuthenticated = useAppSelector(
    (state) => state.auth.user !== null && state.auth.token !== null,
  );

  const shipping = products.length > 0 ? 15 : 0;

  const navigate = useNavigate();

  const handleCheckout = async (): Promise<void> => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (products.length === 0) {
      return;
    }

    if (hasOwnProducts) {
      return;
    }

    try {
      const order = await createOrder({
        items: products.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
        })),
      });

      clearCart();

      navigate(ROUTES.ORDER_DETAIL(order.id), { state: { order } });
    } catch (error: unknown) {
      console.error("Error creating order:", error);

      const message =
        error instanceof AxiosError && error.response?.data?.message
          ? (error.response.data.message as string)
          : "Unable to complete the purchase.";

      console.error(message);
    }
  };

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
            My cart
          </Typography>

          {hasOwnProducts && (
            <Alert
              severity="warning"
              sx={{ mb: 3 }}
              action={
                <Button color="inherit" size="small" onClick={removeOwnProducts}>
                  Remove from cart
                </Button>
              }
            >
              <Box>
                Your cart contains {ownProducts.length}{" "}
                {ownProducts.length === 1 ? "of your products" : "of your products"}
                . You cannot buy products that you published yourself.
              </Box>
            </Alert>
          )}

          <Grid container spacing={4}>
            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              <CartList
                products={products}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                onCheckout={handleCheckout}
                checkoutDisabled={hasOwnProducts}
              />
            </Grid>
          </Grid>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Cart;
