import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import CarsLayout from "@/layouts/CarsLayout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SetNewPassword from "@/pages/auth/SetNewPassword.tsx";
import VerifyAccount from "@/pages/auth/VerifyAccount.tsx";
import VerifyOtp from "@/pages/auth/VerifyOtp.tsx";

import AdminLayout from "@/layouts/AdminLayout.tsx";
import { AdminRoute, PublicRoute } from "./ProtectedRoutes.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import ErrorBoundary from "../components/ErrorBoundary"; // Adjust to match your component file path

const Routes = () => {
  const routes = [
    {
      path: "/",
      Component: RootLayout,
      ErrorBoundary: ErrorBoundary,
      hydrateFallbackElement: <SuspenseUi />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: Component } = await import("../pages/home/Home");
            return { Component };
          },
        },
        // Consolidated: About Page nested inside RootLayout
        {
          path: "about",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/about/About.tsx");
            return { Component };
          },
        },
        // Consolidated: Contact Page nested inside RootLayout
        {
          path: "contact",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/contactus/ContactUs.tsx");
            return { Component };
          },
        },
        {
          path: "cars",
          Component: CarsLayout,
          children: [
            {
              path: "carlisting",
              lazy: async () => {
                const { default: Component } =
                  await import("../pages/cars/CarListing");
                return { Component };
              },
            },
            {
              path: "cardetails/:slug",
              lazy: async () => {
                const { default: Component } =
                  await import("../pages/cars/CarDetails");
                return { Component };
              },
            },
          ],
        },
        {
          path: "booking/:slug",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/booking/Booking");
            return { Component };
          },
        },
        {
          path: "my-bookings",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/booking/MyBookings");
            return { Component };
          },
        },
        {
          path: "verify-payment",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/booking/VerifyPayment.tsx");
            return { Component };
          },
        },
        {
          path: "booking-details/:id",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/booking/BookingDetails.tsx");
            return { Component };
          },
        },
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
    {
      path: "about",
      Component: RootLayout,
      ErrorBoundary: ErrorBoundary,
      hydrateFallbackElement: <SuspenseUi />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: Component } =
              await import("../pages/about/About.tsx");
            return { Component };
          },
        },
      ],
    },
    {
      path: "contact",
      Component: RootLayout,
      ErrorBoundary: ErrorBoundary,
      hydrateFallbackElement: <SuspenseUi />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: Component } =
              await import("../pages/contactus/ContactUs.tsx");
            return { Component };
          },
        },
      ],
    },
    {
      path: "auth",
      Component: AuthLayout,
      ErrorBoundary: ErrorBoundary,
      hydrateFallbackElement: <SuspenseUi />,
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
          path: "register",
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
          path: "verify-account",
          Component: VerifyAccount,
        },
      ],
    },
    {
      path: "admin",
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      ErrorBoundary: ErrorBoundary,
      hydrateFallbackElement: <SuspenseUi />,
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
          path: "settings",
          lazy: async () => {
            const { default: Component } =
              await import("../pages/settings/Setting.tsx");
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

export default Routes;
