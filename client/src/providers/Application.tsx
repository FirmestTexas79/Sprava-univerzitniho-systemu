import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.tsx";
import UserPage from "../pages/UserPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.tsx";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage.tsx";
import { SchedulePage } from "../pages/SchedulePage.tsx";
import { UsersPage } from "../pages/UsersPage.tsx";
import SubjectsPage from "../pages/SubjectsPage.tsx";
import RoomsPage from "../pages/RoomsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/user/:id",
    element: <UserPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/schedule",
    element: <SchedulePage />,
  },
  {
    path: "/rooms",
    element: <RoomsPage />,
  },
  {
    path: "/subjects",
    element: <SubjectsPage />,
  },
]);

export function Application() {
  return (
    <RouterProvider router={router} />
  );
}
