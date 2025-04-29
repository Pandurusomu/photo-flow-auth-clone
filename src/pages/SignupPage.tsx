
import React from 'react';
import { AuthLayout } from '@/components/layout/Layout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-6">
          <h1 className="text-4xl font-bold text-center mb-2">Instagram Clone</h1>
          <p className="text-center text-gray-600">Sign up to see photos from your friends</p>
        </div>
        <SignupForm />
      </div>
    </AuthLayout>
  );
}
