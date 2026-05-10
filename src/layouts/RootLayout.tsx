import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ScrollRestoration } from "react-router";

const RootLayout = () => {
  return (
    <>
<section className="flex flex-col min-h-screen">
  <NavBar />
  <ScrollRestoration />

  <main className="flex-1 pt-19">
    <Outlet />
  </main>

  <Footer />
</section>
    </>
  );
};

export default RootLayout;
