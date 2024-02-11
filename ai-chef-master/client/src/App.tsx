import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import AOS from 'aos';
import 'aos/dist/aos.css';

import AuthProvider from "./components/AuthProvider";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage, AboutPage, LoginPage, SignupPage, DashboardPage } from "./pages";

export default function App() {
  useEffect(() => {
    AOS.init();
  }, []);

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