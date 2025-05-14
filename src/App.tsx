
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
import SignalsPage from "./pages/SignalsPage";
import ChartsPage from "./pages/ChartsPage";
import IndicatorsPage from "./pages/IndicatorsPage";
import DashboardPage from "./pages/DashboardPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="gradient-bg min-h-screen">
              <Toaster />
              <Sonner />
              <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Layout><DashboardPage /></Layout>
                  </ProtectedRoute>
                } />

                {/* Public routes with layout */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/analysis" element={<Layout><AnalysisPage /></Layout>} />
                <Route path="/signals" element={<Layout><SignalsPage /></Layout>} />
                <Route path="/charts" element={<Layout><ChartsPage /></Layout>} />
                <Route path="/indicators" element={<Layout><IndicatorsPage /></Layout>} />
                <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
                <Route path="/about" element={<Layout><AboutPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                
                {/* Catch-all route */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
