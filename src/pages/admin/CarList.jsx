import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data.cars);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cars");
    }
  };

  const deleteCar = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/cars/${id}`);

      setCars(cars.filter((car) => car._id !== id));

      toast.success("Car Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete car");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Cars</h1>

        <button
          onClick={() => navigate("/admin/add-car")}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
        >
          Add New Car
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{car.name}</td>
                  <td className="p-4">{car.brand}</td>
                  <td className="p-4">₹{car.price.toLocaleString()}</td>
                  <td className="p-4">{car.year}</td>

                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit-car/${car._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCar(car._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No Cars Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarList;
