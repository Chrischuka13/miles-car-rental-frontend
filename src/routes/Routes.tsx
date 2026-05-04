// import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";

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
            const { default: Component } =
              await import("../pages/home/Home.tsx");
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
  ] satisfies RouteObject[];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routes;
