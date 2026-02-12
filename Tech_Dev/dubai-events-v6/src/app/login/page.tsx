'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';

type AuthMethod = 'google' | 'email' | 'phone';

export default function LoginPage() {
  const [selectedMethod, setSelectedMethod] = useState<AuthMethod | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f1e6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Welcome to Dubai Events
          </h1>
          <p className="text-gray-600">
            Sign in to discover the best events in Dubai
          </p>
        </div>

        {/* Auth Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          {!selectedMethod ? (
            // Initial method selection
            <>
              <GoogleLoginButton />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedMethod('email')}
                  className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Email</span>
                </button>

                <button
                  onClick={() => setSelectedMethod('phone')}
                  className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Phone</span>
                </button>
              </div>
            </>
          ) : (
            // Selected method form
            <>
              <button
                onClick={() => setSelectedMethod(null)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium mb-4"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to all options
              </button>

              {selectedMethod === 'email' && <EmailLoginForm />}
              {selectedMethod === 'phone' && <PhoneLoginForm />}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
