
import React from 'react';
import { AuthLayout } from '@/components/layout/Layout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-6">
          <h1 className="text-4xl font-bold text-center mb-2">Instagram Clone</h1>
          <p className="text-center text-gray-600">Sign in to see photos from your friends</p>
        </div>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
