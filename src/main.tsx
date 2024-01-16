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
    path: "/Space/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/Space/settings",
    element: (
      <Layout>
        <Settings />
      </Layout>
    ),
  },
  {
    path: "/Space/to-do-list",
    element: (
      <Layout>
        <ToDo />
      </Layout>
    ),
  },
  {
    path: "/Space/notes",
    element: (
      <Layout>
        <Notes />
      </Layout>
    ),
  },
  {
    path: "/Space/expense-tracker",
    element: (
      <Layout>
        <ExpenseTracker />
      </Layout>
    ),
  },
  {
    path: "/Space/pomodoro-clock",
    element: (
      <Layout>
        <Pomodoro />
      </Layout>
    ),
  },
  {
    path: "/Space/countdown",
    element: (
      <Layout>
        <Countdown />
      </Layout>
    ),
  },
  {
    path: "/Space/counter",
    element: (
      <Layout>
        <Counter />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
