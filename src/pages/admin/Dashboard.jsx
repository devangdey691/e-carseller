import { useEffect, useState } from "react";
import API from "../../services/api";

const Dashboard = () => {
  const [cars, setCars] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const carRes = await API.get("/cars");
      const userRes = await API.get("/users");

      setCars(carRes.data.cars.length);
      setUsers(userRes.data.users.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">Total Cars</h2>
          <p className="text-4xl mt-3">{cars}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">Total Users</h2>
          <p className="text-4xl mt-3">{users}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
