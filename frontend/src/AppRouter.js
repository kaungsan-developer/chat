import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/register", Component: Register },
  { path: "/profile", Component: Profile },
]);

export default router;
