import { useEffect, useState } from "react";
import API from "../../services/api";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await API.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <div className="bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-6">My Profile</h1>

        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">My Order History</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={`${order._id}-${index}`} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-right font-semibold">
                  Total: ₹{order.totalAmount?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;