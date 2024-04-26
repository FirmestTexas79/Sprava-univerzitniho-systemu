import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.tsx";
import UserPage from "../pages/UserPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.tsx";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "user",
    element: <UserPage />,
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
]);

export function Application() {
  return (
    <RouterProvider router={router} />
  );
}
