import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage, AboutPage, LoginPage, SignupPage, DashboardPage } from "./pages";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><HomePage /></>,
  },
  {
    path: '/about',
    element: <><Navbar /><AboutPage /></>,
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
        <Navbar />
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
        position="top-center"
        richColors
      />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}