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

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children:[
        { 
          path: "/",
          element: <Login />, 
        },
        { 
          path: "/signup",
          element: <SignUp />,
        },
        { 
          path: "/forgot-password",
          element: <Forget />,
        },
        {
          path: "/aboutus",
          element: <About />,
        },
        {
          path: "/contactus",
          element: <Contact />,
        }
      ]
    },
    
    {

        path: "/",
        element: <PrivateLayout />,
        children: [
          {
            path: "/home",
            element: <Home />}
        ]
    },
    ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default Router;
