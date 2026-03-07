import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();
  const { clearCart } = useCart();

  const handleUserLogout = () => {
    navigate("/");
    clearCart();
    logoutUser();
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end items-center">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleUserLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
