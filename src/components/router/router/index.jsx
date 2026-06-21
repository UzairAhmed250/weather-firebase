import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../../../pages/home";
import About from "../../../pages/about";
import Contact from "../../../pages/contactus";
import Login from "../../../{auth}/login";
import SignUp from "../../../{auth}/signup";
import Forget from "../../../{auth}/forget";
import AuthLayout from "../../authlayout/authLayout";
import AppLayout from "../../app-layout/AppLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "home", element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
          { path: "forgot-password", element: <Forget /> },
          { path: "aboutus", element: <About /> },
          { path: "contactus", element: <Contact /> },
        ],
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
