import { useEffect, useState } from "react";
import API from "../../services/api";
import CarCard from "../../Components/user/CarCard";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    filterCars();
  }, [search, brand, cars]);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data.cars);
      setFilteredCars(res.data.cars);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCars = () => {
    let updatedCars = [...cars];

    if (search) {
      updatedCars = updatedCars.filter((car) =>
        car.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (brand) {
      updatedCars = updatedCars.filter((car) => car.brand === brand);
    }

    setFilteredCars(updatedCars);
  };

  const brands = [...new Set(cars.map((car) => car.brand))];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-bold text-center mb-10">Available Cars</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search Car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">All Brands</option>

          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Cars Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl text-gray-500">No Cars Found</div>
      )}
    </div>
  );
};

export default Cars;
