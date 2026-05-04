import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import CarsLayout from "../layouts/CarsLayout";

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
              lazy: async () => {
                const { default: Component } =
                  await import("../pages/cars/CarListing");
                return { Component };
              },
            },
            {
              path: "cardetails/:id",
              lazy: async () => {
                const { default: Component } =
                  await import("../pages/cars/CarDetails");
                return { Component };
              },
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
