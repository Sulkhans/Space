import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Authentication } from "./pages/Authentication";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
  },
  {
    path: "/Space/",
    element: <Navigate to={"/Space/auth"} />,
  },
  {
    path: "/Space/auth",
    element: <Authentication />,
  },
  {
    path: "/Space/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
