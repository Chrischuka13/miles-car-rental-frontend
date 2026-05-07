import { Outlet } from "react-router";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div className=" lg:grid grid-cols-12 overflow-y-auto  h-screen   w-full ">
      <div className="col-span-12 lg:col-span-6 p-4   md:p-10 lg:p-20 ">
        <div className="mt-8 md:mt-24 lg:mt-0  flex justify-center lg:justify-start">
          <Logo />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
      <div
        className=" col-span-6 bg-contain  bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/image 20.png')" }}
      ></div>
    </div>
  );
};

export default AuthLayout;
