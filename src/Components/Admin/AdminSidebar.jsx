import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold text-red-500 mb-10">Carseller</h1>

      <div className="flex flex-col gap-4">
        <Link to="/admin" className="hover:text-red-500">
          Dashboard
        </Link>

        <Link to="/admin/add-car" className="hover:text-red-500">
          Add Car
        </Link>

        <Link to="/admin/car-list" className="hover:text-red-500">
          Car List
        </Link>
        <Link to="/admin/users" className="hover:text-red-500">
          Users
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
