import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from './pages/HomePage';
import SignalsPage from './pages/SignalsPage';
import AnalysisPage from './pages/AnalysisPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import CreateAnalysisPage from "./pages/CreateAnalysisPage";
import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import CreateSignalPage from "./pages/CreateSignalPage";
import ProfilePage from './pages/ProfilePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import ChartsPage from './pages/ChartsPage';
import IndicatorsPage from './pages/IndicatorsPage';
import DashboardPage from './pages/DashboardPage';
import EditAnalysisPage from "./pages/EditAnalysisPage";
import EditSignalPage from "./pages/EditSignalPage";
import EditBlogPostPage from "./pages/EditBlogPostPage";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/signals" element={<Layout><SignalsPage /></Layout>} />
              <Route path="/analysis" element={<Layout><AnalysisPage /></Layout>} />
              <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route path="/analysis/create" element={<Layout><CreateAnalysisPage /></Layout>} />
              <Route path="/blog/create" element={<Layout><CreateBlogPostPage /></Layout>} />
              <Route path="/signals/create" element={<Layout><CreateSignalPage /></Layout>} />
              <Route path="/analysis/edit/:id" element={<Layout><EditAnalysisPage /></Layout>} />
              <Route path="/signals/edit/:id" element={<Layout><EditSignalPage /></Layout>} />
              <Route path="/blog/edit/:id" element={<Layout><EditBlogPostPage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/charts" element={<Layout><ChartsPage /></Layout>} />
              <Route path="/indicators" element={<Layout><IndicatorsPage /></Layout>} />
              <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
              <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
            </Routes>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
