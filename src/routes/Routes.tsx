import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetNewPassword from "@/pages/auth/SetNewPassword.tsx";
import VerifyAccount from "@/pages/auth/VerifyAccount.tsx";
import VerifyOtp from "@/pages/auth/VerifyOtp.tsx";

const Routes = () => {
  const routes = [
    {
      path: "/",
      Component: RootLayout,
      hydrateFallbackElement: <SuspenseUi />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: Component } =
              await import("../pages/home/Home.tsx");
            return { Component };
          },
        },
      ],
    },
    {
      path: "auth",
      Component: AuthLayout,
      children: [
        {
          path: "login",
          Component: Login,
        },
        {
          path: "createAccount",
          Component: SignUp,
        },
        {
          path: "forgot-password",
          Component: ForgotPassword,
        },
        {
          path: "verify-otp",
          Component: VerifyOtp,
        },
        {
          path: "set-new-password",
          Component: SetNewPassword,
        },
        {
          path: "verify-Account",
          Component: VerifyAccount,
        },
      ],
    },
  ] satisfies RouteObject[];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routes;