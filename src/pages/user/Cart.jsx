import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { clearCart, getCartItems, removeFromCart, updateQuantity } from '../../services/cart';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const handleQuantityChange = (carId, quantity) => {
    const updatedItems = updateQuantity(carId, quantity);
    setItems(updatedItems);
  };

  const handleRemove = (carId) => {
    const updatedItems = removeFromCart(carId);
    setItems(updatedItems);
  };

  const handleClearCart = () => {
    setItems(clearCart());
    setMessage('Cart cleared');
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    setLoading(true);
    setMessage('');

    try {
      const payload = {
        items: items.map(({ _id, name, brand, price, quantity, image }) => ({
          carId: _id,
          name,
          brand,
          price,
          quantity,
          image,
        })),
        totalAmount: subtotal,
      };

      const res = await API.post('/checkout', payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.data.success) {
        clearCart();
        setItems([]);
        navigate('/checkout-success');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <p className="text-gray-500 mt-2">All your selected cars are listed here.</p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-red-500 font-semibold hover:underline"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Browse our collection and add your favorite cars.</p>
          <Link to="/cars" className="bg-red-500 text-white px-6 py-3 rounded-lg inline-block">
            Explore Cars
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow p-4">
                <img src={item.image} alt={item.name} className="w-32 h-24 object-cover rounded-lg" />

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-500">{item.brand}</p>
                    </div>
                    <button onClick={() => handleRemove(item._id)} className="text-sm text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                        className="border rounded px-3 py-2 w-20"
                      />
                    </div>

                    <div className="text-lg font-semibold text-red-500">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {message && <p className="mt-3 text-sm text-red-500">{message}</p>}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-red-500 disabled:opacity-60"
            >
              {loading ? 'Placing Order...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
