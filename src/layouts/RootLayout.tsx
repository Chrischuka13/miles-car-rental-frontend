import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ScrollRestoration } from "react-router";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
