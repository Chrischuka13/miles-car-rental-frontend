// import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import CarsLayout from "../layouts/CarsLayout";
import CarListing from "../pages/cars/CarListing";
import CarDetails from "../pages/cars/CarDetails";

// import React, { Children, Component, lazy, Suspense } from 'react'

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
            const { default: Component } = await import("../pages/home/Home");
            return { Component };
          },
        },
        {
          path: "cars",
          Component: CarsLayout,
          children: [
            {
              path: "carlisting",
              Component: CarListing,
            },
            {
              path: "cardetails",
              Component: CarDetails,
            },

          ],
        },
      ],
    },
  ] satisfies RouteObject[];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routes;
