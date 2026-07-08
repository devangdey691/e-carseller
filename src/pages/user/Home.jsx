import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import CarCard from "../../Components/user/CarCard";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const res = await API.get("/cars");

      const featured = res.data.cars.filter((car) => car.featured === true);

      setFeaturedCars(featured);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="bg-black text-white min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Find Your <span className="text-red-500">Dream Car</span>
            </h1>

            <p className="mt-6 text-xl text-gray-300">
              Buy premium, luxury and sports cars at the best prices.
            </p>

            <Link
              to="/cars"
              className="inline-block mt-8 bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Explore Cars
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Car"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">Featured Cars</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
