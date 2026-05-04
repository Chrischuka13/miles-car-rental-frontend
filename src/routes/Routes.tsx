// import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";

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
          }
        },
        {
          path: "about",
          lazy: async () => {
            const { default: Component } = await import("../pages/about/About");
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
