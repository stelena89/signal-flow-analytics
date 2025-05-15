
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

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

const App = () => {
  return (
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
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
