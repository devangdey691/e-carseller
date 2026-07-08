import { Outlet } from "react-router-dom";
import Navbar from "../Components/user/Navbar";
import Footer from "../Components/user/Footer";
import Breadcrumbs from "../Components/user/Breadcrumbs";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;