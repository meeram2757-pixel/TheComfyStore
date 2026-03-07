import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <CartProvider>
      <AppRoutes />
      <ToastContainer position="top-center" />
    </CartProvider>
  </UserProvider>,
);
