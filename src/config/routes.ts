import NotFound from "@pages/NotFound";
import Login from "@pages/Login";
import React from "react";

const Home = React.lazy(() => import("@pages/Home"));

export const privateRoutes = [
  {
    path: "/",
    element: Home,
    title: "Home",
  },
];

export const publicRoutes = [
  {
    path: "/login",
    element: Login,
    title: "Login",
  },
  {
    path: "/notfound",
    element: NotFound,
    title: "Not Found",
  },
];

const routes = [...privateRoutes, ...publicRoutes];

export default routes;
