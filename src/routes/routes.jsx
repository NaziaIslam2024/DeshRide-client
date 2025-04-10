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
import AllCars from "../pages/Dashboard/Admin/AllCars";
import MyAddedCar from "../pages/Dashboard/CarProvider/MyAddedCar";
import AllListedCars from "../pages/Dashboard/Consumer/AllListedCars";
import RentACar from "../pages/RentACar/RentACar";
import CarDetails from "../pages/RentACar/CarDetails";

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
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/rent-a-car",
        element: <RentACar></RentACar>,
      },
      {
        path: "/rent-car/:carId",
        element: <CarDetails></CarDetails>,
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
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "Dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/Dashboard",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "vehicle",
        element: <MyAddedCar></MyAddedCar>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "all-user",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "add-car",
        element: <AddCar></AddCar>,
      },
      {
        path: "all-vehicle",
        element: <CarSelect></CarSelect>,
      },
      {
        path: "all-cars",
        element: <AllCars></AllCars>,
      },
      // consumer
      {
        path: "all-listed-cars",
        element: <AllListedCars></AllListedCars>,
      },
    ],
  },
]);
