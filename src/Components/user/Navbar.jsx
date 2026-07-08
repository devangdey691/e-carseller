import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCartCount } from "../../services/cart";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartCount, setCartCount] = useState(getCartCount());

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cart:updated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart:updated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };
  return (
    <div>
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-red-500">
            Carseller
          </Link>

          <div className="flex gap-8 text-lg">
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>

            <Link to="/cars" className="hover:text-red-500">
              Cars
            </Link>

            <Link to="/about" className="hover:text-red-500">
              About
            </Link>

            <Link to="/contact" className="hover:text-red-500">
              Contact
            </Link>

            <Link to="/cart" className="hover:text-red-500 flex items-center gap-1">
              Cart
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            </Link>

            {user ? (
              <>
                <Link to="/profile">{user.name}</Link>

                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
