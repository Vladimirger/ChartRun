import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
  import App from './App.jsx'
  import Login from "./pages/LoginPage/Login.jsx";
  import SignUp from "./pages/SignUp.jsx";
  import Home from "./pages/Home.jsx";

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
    {
      path: "/home",
      element: <Home />
    }
  ]);