import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <RouterProvider router={router} />
  // </StrictMode>
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
