import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import SellProduct from "../pages/SellProduct";
import MyProducts from "../pages/MyProducts";
import EditProduct from "../pages/EditProduct";

import { ROUTES } from "./paths";

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />

      <Route path={ROUTES.PRODUCTS} element={<Products />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.ORDERS} element={<Orders />} />
        <Route path={ROUTES.ORDER_DETAIL_PATH} element={<OrderDetail />} />
        <Route path={ROUTES.SELL_PRODUCT} element={<SellProduct />} />
        <Route path={ROUTES.MY_PRODUCTS} element={<MyProducts />} />
        <Route path={ROUTES.EDIT_PRODUCT_PATH} element={<EditProduct />} />
      </Route>

      <Route path={ROUTES.PRODUCT_DETAIL_PATH} element={<ProductDetail />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
