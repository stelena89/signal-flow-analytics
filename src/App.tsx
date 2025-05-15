import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import HomePage from './pages/HomePage';
import SignalsPage from './pages/SignalsPage';
import AnalysisPage from './pages/AnalysisPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthContextProvider } from './contexts/AuthContext';
import CreateAnalysisPage from "./pages/CreateAnalysisPage";
import CreateBlogPostPage from "./pages/CreateBlogPostPage";
import CreateSignalPage from "./pages/CreateSignalPage";

const App = () => {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
};

export default App;
