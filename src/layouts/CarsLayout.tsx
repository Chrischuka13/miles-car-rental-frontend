import { Outlet, ScrollRestoration } from "react-router";

export default function CarsLayout() {
  return (
    <div>
      <ScrollRestoration
        getKey={(location) => {
          //This tells the browser Only restore scroll position if the main path changed, not on query param changes like ?search= or ?category=
          return location.pathname;
        }}
      />
      <Outlet />
    </div>
  );
}