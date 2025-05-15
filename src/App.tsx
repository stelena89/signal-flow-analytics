
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
import CreateAnalysisPage from "./pages/CreateAnalysisPage";
import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import CreateSignalPage from "./pages/CreateSignalPage";
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signals" element={<SignalsPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analysis/create" element={<CreateAnalysisPage />} />
          <Route path="/blog/create" element={<CreateBlogPostPage />} />
          <Route path="/signals/create" element={<CreateSignalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
