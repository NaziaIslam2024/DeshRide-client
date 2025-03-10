import Error from "../pages/Error";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import Page_1 from "../pages/Page_1";
import Page_02 from "../pages/Page_02";
// import MyReviews from "../pages/MyReviews";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register.jsx";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../privatePages/Dashboard.jsx";
import UpdateProfile from "../privatePages/UpdateProfile";
import ResetPass from "../privatePages/ResetPass";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/page_01",
        element: <Page_1 />,
      },

      {
        path: "/page_02",
        element: (
          <PrivateRoute>
            <Page_02 />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/reset-password",
        element: <ResetPass />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  ////////////
  {
    path: "*",
    element: <Error></Error>,
  },
];
const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
