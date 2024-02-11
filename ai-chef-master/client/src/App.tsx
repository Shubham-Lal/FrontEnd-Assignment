import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage, AboutPage, LoginPage, SignupPage, DashboardPage } from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute>
        <SignupPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        duration={2500}
        position="bottom-center"
        richColors
      />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}