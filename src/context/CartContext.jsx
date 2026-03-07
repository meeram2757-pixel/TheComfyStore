import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

export const defaultCartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const defaultState = defaultCartState;

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const calculateTotals = (state) => {
  const tax = 0.1 * state.cartTotal;
  const orderTotal = state.cartTotal + state.shipping + tax;
  const newState = { ...state, tax, orderTotal };
  localStorage.setItem("cart", JSON.stringify(newState));
  return newState;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      let newCartItems;
      if (item) {
        newCartItems = state.cartItems.map((i) =>
          i.cartID === product.cartID
            ? { ...i, amount: i.amount + product.amount }
            : i
        );
      } else {
        newCartItems = [...state.cartItems, product];
      }
      const numItemsInCart = state.numItemsInCart + product.amount;
      const cartTotal = state.cartTotal + product.price * product.amount;
      const newState = {
        ...state,
        cartItems: newCartItems,
        numItemsInCart,
        cartTotal,
      };
      toast.success("item added to cart");
      return calculateTotals(newState);
    }
    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    case "REMOVE_ITEM": {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      const newCartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      const numItemsInCart = state.numItemsInCart - product.amount;
      const cartTotal = state.cartTotal - product.price * product.amount;
      const newState = {
        ...state,
        cartItems: newCartItems,
        numItemsInCart,
        cartTotal,
      };
      toast.error("item removed from cart");
      return calculateTotals(newState);
    }
    case "EDIT_ITEM": {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      const numItemsInCart =
        state.numItemsInCart + amount - item.amount;
      const cartTotal =
        state.cartTotal + item.price * (amount - item.amount);
      const newCartItems = state.cartItems.map((i) =>
        i.cartID === cartID ? { ...i, amount } : i
      );
      const newState = {
        ...state,
        cartItems: newCartItems,
        numItemsInCart,
        cartTotal,
      };
      toast.success("cart updated");
      return calculateTotals(newState);
    }
    default:
      return state;
  }
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getCartFromLocalStorage());

  useEffect(() => {
    const handler = () => dispatch({ type: "CLEAR_CART" });
    window.addEventListener("cart-cleared", handler);
    return () => window.removeEventListener("cart-cleared", handler);
  }, []);

  const addItem = (payload) => dispatch({ type: "ADD_ITEM", payload });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const removeItem = (payload) => dispatch({ type: "REMOVE_ITEM", payload });
  const editItem = (payload) => dispatch({ type: "EDIT_ITEM", payload });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        clearCart,
        removeItem,
        editItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
