import { Outlet, ScrollRestoration } from "react-router"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"



const RootLayout = () => {
  return (
    <div>
      <NavBar/>
      <ScrollRestoration/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout;
