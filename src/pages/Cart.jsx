import { useSelector } from "react-redux";
import { SectionTitle, CartSummary } from "../components";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle title="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle title="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {cartItems.map((item) => {
            return <CartItem key={item.cartID} cartItem={item} />;
          })}
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartSummary />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
