import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { addToCart } from "../../services/cart";
import { toast } from "react-toastify";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = useCallback(async () => {
    try {
      const res = await axios.get(`/cars/${id}`);
      setCar(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchCar();
  }, [fetchCar]);
  if (!car) {
    return <div className="text-center py-20 text-2xl">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={car.image}
          alt={car.name}
          className="w-full rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-5xl font-bold">{car.name}</h1>

          <p className="text-xl text-gray-500 mt-2">{car.brand}</p>

          <h2 className="text-4xl font-bold text-red-500 mt-6">
            ₹{car.price.toLocaleString()}
          </h2>

          <div className="mt-6 space-y-3 text-lg">
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Fuel:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Transmission:</strong> {car.transmission}
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                addToCart(car);
                toast.success(`${car.name} added to cart`);
              }}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-black"
            >
              Add to Cart
            </button>

            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-red-500">
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Description</h2>

        <p className="text-gray-700 text-lg">{car.description}</p>
      </div>
    </div>
  );
};

export default CarDetails;
