import { Link } from "react-router-dom";
import { addToCart } from "../../services/cart";
import { toast } from "react-toastify";

const CarCard = ({ car }) => {
  const handleAddToCart = () => {
    addToCart(car);
    toast.success(`${car.name} added to cart`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold">{car.name}</h2>

        <p className="text-gray-500 mt-1">{car.brand}</p>

        <div className="flex justify-between mt-4">
          <span className="font-semibold text-red-500 text-xl">
            ₹{car.price.toLocaleString()}
          </span>

          <span className="text-gray-600">{car.year}</span>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            to={`/car/${car._id}`}
            className="flex-1 text-center bg-black text-white py-3 rounded-lg hover:bg-red-500"
          >
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
