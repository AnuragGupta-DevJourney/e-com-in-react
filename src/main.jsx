import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import About from "./pages/about/About.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Layout from "./pages/Layout.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import UseContextApi from "./context/UseContextApi.jsx";
import SingleProductPage from "./pages/single-product-page/SingleProductPage.jsx";
import { ToastBar, Toaster } from "react-hot-toast";
import Category from "./pages/category/Category.jsx";
import ProtectRoute from "./utils/ProtectRoute.jsx";
// import Contact from "./pages/contact/Contact.jsx";

const Contact = lazy(() => import("./pages/contact/Contact.jsx"));

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/cart",
        element: (
          <ProtectRoute>
            <Cart />
          </ProtectRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UseContextApi>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Toaster />
        <RouterProvider router={router} />
      </ClerkProvider>
    </UseContextApi>
  </StrictMode>
);
