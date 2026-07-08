import { useEffect, useState } from "react";
import API from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchAllOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await API.get("/admin/orders", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    const token = localStorage.getItem("token");

    try {
      await API.put(
        `/admin/orders/${orderId}/status`,
        { status },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      );
      fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">Registered Users</h1>

        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">All Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-600">User: {order.user?.name || "Guest"}</p>
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-3 py-2"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div className="mt-2 space-y-2">
                  {order.items.map((item, index) => (
                    <div key={`${order._id}-${index}`} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right font-semibold">Total: ₹{order.totalAmount?.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;