
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Loader } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function Layout({ children, requireAuth = true }: LayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size={32} className="animate-spin text-instagram-primary" />
      </div>
    );
  }

  // If auth is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but on login/signup page, redirect to home
  if (isAuthenticated && ['/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-instagram-background">
      {isAuthenticated && <Navbar />}
      <main className={`flex-1 ${isAuthenticated ? 'pt-16' : 'pt-0'}`}>
        {children}
      </main>
    </div>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return <Layout requireAuth={false}>{children}</Layout>;
}

export function ProtectedLayout({ children }: { children: ReactNode }) {
  return <Layout requireAuth={true}>{children}</Layout>;
}
