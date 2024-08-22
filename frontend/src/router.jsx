import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
  import App from './App.jsx'
  import Login from "./pages/LoginPage/Login.jsx";
  import SignUp from "./pages/SignUp.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);