// import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
<<<<<<< HEAD

// import React, { Children, Component, lazy, Suspense } from 'react'
=======
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetNewPassword from "@/pages/auth/SetNewPassword.tsx";
import VerifyAccount from "@/pages/auth/VerifyAccount.tsx";
import VerifyOtp from "@/pages/auth/VerifyOtp.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";
import { PublicRoute } from "./ProtectedRoutes.tsx";
>>>>>>> 8274abf35f3c8dc5aef7e97cd024fc91e143540a

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
<<<<<<< HEAD
        {
          path: "/contactus",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/contactus/ContactUs.tsx");
            return { Component };
          },
        },
      ],
    },
  ] satisfies RouteObject[];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

=======
      ],
    },
   {
  path: "auth",
  Component: AuthLayout,
  children: [
    {
      path: "login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "createAccount",
      element: (
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      ),
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

    {
      path: "admin",
      Component: AdminLayout,
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: Component } =
              await import("../pages/dashboard/Dashboard.tsx");
            return { Component };
          },
        },
        {
          path: "bookings",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/bookings/Bookings.tsx");
            return { Component };
          },
        },
        {
          path: "fleet",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/fleet/Fleet.tsx");
            return { Component };
          },
        },
        {
          path: "customers",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/customers/Customers.tsx");
            return { Component };
          },
        },
        {
          path: "drivers",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/drivers/Drivers.tsx");
            return { Component };
          },
        },
        {
          path: "bookings/:id",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/bookings/BookingDetails.tsx");
            return { Component };
          },
        },
      ],
    },
  ] satisfies RouteObject[];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

>>>>>>> 8274abf35f3c8dc5aef7e97cd024fc91e143540a
export default Routes;
