import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRoutes />
    <ToastContainer position="top-center" />
  </Provider>,
);
