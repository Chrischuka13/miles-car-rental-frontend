import { Outlet } from "react-router";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden w-full">
      <div className=" bg-white px-6 py-10 md:px-16 ">
        <div className="mb-8">
          <Logo/>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>

      <div
        className="hidden lg:flex h-full w-full object-contain bg-cover "
        style={{ backgroundImage: "url('/image 20.png')"}}>
        </div>
    </main>
  );
};

export default AuthLayout;
