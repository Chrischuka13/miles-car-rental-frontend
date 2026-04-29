import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SuspenseUi from "../components/ui/SuspenseUi";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";




const Routes = () => {
    const routes = [
        {
            path: "/",
            Component: RootLayout,
            hydrateFallbackElement: <SuspenseUi/>,
            children: [
                {
                    index: true,
                    lazy: async () => {
                        const { default: Component} = await import ("../pages/home/Home");
                        return {Component}
                    },
                },
            ]
        },
          {
            path: "auth",
            Component: AuthLayout,
            children: [
                {
                    path: "login",
                    Component: Login
                },
                {
                    path: "createAccount",
                    Component: SignUp
                }


            ]
        }
    ] satisfies RouteObject[];
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;

}

export default Routes