import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

function MainLayout() {
  return (
    <div className="max-w-main mx-auto ">
      <Navbar></Navbar>
      <ScrollRestoration />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
