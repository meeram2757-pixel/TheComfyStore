import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Checkout,
  Error,
  HomeLayout,
  LandingPage,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "../pages";

import CartPage from "../features/cart/CartPage";

import { ErrorElement } from "../components";

import { loader as landingLoader } from "../pages/LandingPage";
import { loader as productsLoader } from "../pages/Products";
import { loader as singleProductLoader } from "../pages/SingleProduct";
import { loader as checkoutLoader } from "../pages/Checkout";
import { loader as ordersLoader } from "../pages/Orders";

import { action as registerAction } from "../pages/Register";
import { action as checkoutAction } from "../pages/Checkout";
import { action as ordersAction } from "../pages/Orders";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorElement />,
        loader: landingLoader,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      { path: "about", element: <About /> },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader,
        action: checkoutAction,
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader,
        action: ordersAction,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRoutes;
