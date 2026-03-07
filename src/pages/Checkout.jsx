import { useCart } from "../context/CartContext";
import { SectionTitle, CartSummary } from "../components";
import { toast } from "react-toastify";
import { redirect, Form } from "react-router-dom";
import { customFetch } from "../api";
import { defaultCartState } from "../context/CartContext";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultCartState;
};

export const loader = async () => {
  const user = getUserFromLocalStorage();
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { name, address } = Object.fromEntries(formData);
  const user = getUserFromLocalStorage();
  const { cartItems, orderTotal, numItemsInCart } = getCartFromLocalStorage();

  if (user.username === "demo user") {
    toast.error("Register or Login required to place orders");
    return null;
  }

  const info = {
    name,
    address,
    chargeTotal: orderTotal,
    orderTotal: (orderTotal / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }),
    cartItems,
    numItemsInCart,
  };

  try {
    await customFetch.post(
      "/orders",
      { data: info },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
    localStorage.setItem("cart", JSON.stringify(defaultCartState));
    window.dispatchEvent(new Event("cart-cleared"));
    toast.success("order placed successfully");
    return redirect("/orders");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "there was an error placing your order";
    toast.error(errorMessage);
    if (error?.response?.status === 401 || error?.response?.status === 403)
      return redirect("/login");
    return null;
  }
};

const Checkout = () => {
  const { cartTotal } = useCart();

  if (cartTotal === 0) {
    return <SectionTitle title="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle title="place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <Form method="POST" className="flex flex-col gap-y-4">
          <h4 className="font-medium text-xl capitalize">
            shipping information
          </h4>
          <FormInput label="first name" name="name" type="text" />
          <FormInput label="address" name="address" type="text" />
          <div className="mt-4">
            <SubmitButton text="place your order" />
          </div>
        </Form>
        <CartSummary />
      </div>
    </>
  );
};
export default Checkout;
