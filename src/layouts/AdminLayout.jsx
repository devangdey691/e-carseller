import { Outlet } from "react-router-dom";
import Breadcrumbs from "../Components/user/Breadcrumbs";
import AdminSidebar from "../Components/Admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
