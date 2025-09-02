import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./AppRouter.js";
import { Outlet } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>{Outlet}</RouterProvider>
  </StrictMode>
);
