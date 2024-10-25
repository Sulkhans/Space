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
import { ToDo } from "./pages/ToDo";
import { Notes } from "./pages/Notes";
import { ExpenseTracker } from "./pages/ExpenseTracker";
import { Pomodoro } from "./pages/Pomodoro";
import { Countdown } from "./pages/Countdown";
import { Counter } from "./pages/Counter";
import { Settings } from "./pages/Settings";

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
    path: "/Space",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "to-do-list",
        element: <ToDo />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "expense-tracker",
        element: <ExpenseTracker />,
      },
      {
        path: "pomodoro-clock",
        element: <Pomodoro />,
      },
      {
        path: "countdown",
        element: <Countdown />,
      },
      {
        path: "counter",
        element: <Counter />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
