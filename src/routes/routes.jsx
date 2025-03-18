import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import VehicleList from "../pages/Dashboard/Admin/VehicleList";
import About from "../pages/About/About";
import PrivacyPolicy from "../pages/privacy&policy/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path : "/about",
        element: <About></About>
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
      {
        path: "privacy&policy",
        element: <PrivacyPolicy></PrivacyPolicy>
      }
    ],
  },

  {
    path: "Dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'vehicle',
        element: <VehicleList></VehicleList>
      }
    ]
  },
]);
