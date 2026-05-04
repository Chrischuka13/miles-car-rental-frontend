import { Outlet, ScrollRestoration } from "react-router"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"


const RootLayout = () => {
  return (
    <>
      <NavBar/>
      <ScrollRestoration/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default RootLayout;
