import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import ProductForm from "@/pages/ProductForm";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "product/create",
        element: <ProductForm />,
      },
      {
        path: "product/edit/:id",
        element: <ProductForm />,
      },
    ],
  },
]);
