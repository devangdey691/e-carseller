import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    year: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await API.get(`/cars/${id}`);

        setFormData({
          name: res.data.car.name || "",
          brand: res.data.car.brand || "",
          price: res.data.car.price || "",
          year: res.data.car.year || "",
          fuelType: res.data.car.fuelType || "",
          transmission: res.data.car.transmission || "",
          mileage: res.data.car.mileage || "",
          image: res.data.car.image || "",
          description: res.data.car.description || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateCar = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/cars/${id}`, formData);

      toast.success("Car Updated Successfully");

      navigate("/admin/car-list");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update car");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-4xl font-bold mb-6">
        Edit Car
      </h1>

      <form onSubmit={updateCar} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={formData.fuelType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditCar;