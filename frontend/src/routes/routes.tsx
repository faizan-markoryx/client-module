import Login from "../component/login/Login";
import Clients from "../pages/Clients";
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import Contacts from "../pages/Contacts";
import NotificationSection from "../component/header/NotificationSection";

const routes: any = (isUser: any, isAdmin: any) => [
  {
    path: "/",
    element: isUser ? (
      <Navigate to={"/dashboard"} />
    ) : (
      <Navigate to={"/login"} />
    ),
  },

  {
    path: "/dashboard",
    element: isUser ? <Dashboard /> : <Navigate to={"/login"} />,
  },

  {
    path: "/notification",
    element: isUser ? <NotificationSection /> : <Navigate to={"/login"} />,
  },
  {
    path: "/reports",
    element: isUser && isAdmin ? <Reports /> : <Navigate to={"/login"} />,
  },

  {
    path: "/clients",
    element: isUser ? <Clients /> : <Navigate to={"/login"} />,
  },

  {
    path: "/contacts",
    element: isUser ? <Contacts /> : <Navigate to={"/login"} />,
  },

  {
    path: "/users",
    element: isUser && isAdmin ? <Users /> : <Navigate to={"/login"} />,
  },

  {
    path: "/login",
    element: isUser ? <Navigate to={"/dashboard"} /> : <Login />,
  },
];

export default routes;
