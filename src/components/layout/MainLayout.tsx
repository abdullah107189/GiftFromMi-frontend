import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";

function MainLayout() {
  return (
    <div className="max-w-main mx-auto ">
      <Navbar></Navbar>
      <ScrollRestoration />
      <div className="min-h-[calc(100vh-300px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
