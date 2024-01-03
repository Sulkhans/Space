import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Authentication } from "./pages/Authentication";
import { Home } from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/Space/",
    element: <Navigate to={"/Space/auth"} />,
  },
  {
    path: "/Space/auth",
    element: <Authentication />,
  },
  {
    path: "/Space/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
