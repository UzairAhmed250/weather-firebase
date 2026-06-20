import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../../../pages/home";
import About from "../../../pages/about";
import Contact from "../../../pages/contactus";
import Login from "../../../{auth}/login";
import SignUp from "../../../{auth}/signup";
import Forget from "../../../{auth}/forget";
import AuthLayout from "../../authlayout/authLayout";
import PrivateLayout from "../../privateLayout/privateLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgot-password", element: <Forget /> },
      { path: "aboutus", element: <About /> },
      { path: "contactus", element: <Contact /> },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [{ path: "home", element: <Home /> }],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
