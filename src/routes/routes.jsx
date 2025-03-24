import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import VehicleList from "../pages/Dashboard/Admin/VehicleList";
import About from "../pages/About/About";
import PrivacyPolicy from "../pages/privacy&policy/PrivacyPolicy";
import MyProfile from "../pages/Dashboard/Shared/MyProfile";
import ErrorPage from "../components/ErrorPage";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AddCar from "../pages/Dashboard/CarProvider/AddCar";
import CarSelect from "../pages/Dashboard/CarProvider/CarSelect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: '/Dashboard',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'vehicle',
        element: <VehicleList></VehicleList>
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'all-user',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'add-car',
        element: <AddCar></AddCar>
      },
      {
        path: 'all-vehicle',
        element: <CarSelect></CarSelect>
      }
    ]
  },
]);
