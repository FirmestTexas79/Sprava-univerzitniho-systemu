import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.tsx";
import UserPage from "../pages/user/UserPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.tsx";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage.tsx";
import { SchedulePage } from "../pages/SchedulePage.tsx";
import { UsersPage } from "../pages/user/UsersPage.tsx";
import SubjectsPage from "../pages/subject/SubjectsPage.tsx";
import RoomsPage from "../pages/RoomsPage.tsx";
import { SubjectPage } from "../pages/subject/SubjectPage.tsx";

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
  {
    path: "/subject/:id",
    element: <SubjectPage />,
  },
]);

export function Application() {
  return (
    <RouterProvider router={router} />
  );
}
