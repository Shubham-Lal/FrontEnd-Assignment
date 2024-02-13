import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import loadServer from "./utils/load-server";
import LoadingPage from "./Loading";
import ErrorPage from "./Error";
import AuthProvider from "./components/AuthProvider";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage, AboutPage, LoginPage, SignupPage, DashboardPage } from "./pages";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);

  loadServer(setServerDown, setLoading);

  if (loading) return <LoadingPage />;
  if (serverDown) return <ErrorPage message="Failed to connect to server!" />;
  return (
    <AuthProvider>
      <Toaster
        duration={2500}
        position="bottom-center"
        richColors
      />
      <Background>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
            <Route path="/signup" element={<ProtectedRoute><SignupPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </Background>
    </AuthProvider>
  )
}