import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    year: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    image: null,
    description: "",
    featured: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await API.post("/cars", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Car Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-4xl font-bold mb-6">Add New Car</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="file"
          name="image"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({
                ...formData,
                featured: e.target.checked,
              })
            }
          />

          <label>Featured Car</label>
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-3 rounded"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
