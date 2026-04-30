import { Outlet } from "react-router";
import NavBar from "../components/nav/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;