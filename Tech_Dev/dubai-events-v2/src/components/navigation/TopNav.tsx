'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

interface TopNavProps {
  navButtons?: React.ReactNode;
}

const TopNav: React.FC<TopNavProps> = ({ navButtons }) => {
  const { user, signOut } = useAuth();

  return (
    <div className="fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-50">
      <div className="bg-white/60 backdrop-blur-xl rounded-full px-3 md:px-4 py-1.5 md:py-2 shadow-xl border border-white/60 flex items-center justify-between
                     before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-white/20 before:pointer-events-none before:rounded-full
                     after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:via-white/10 after:to-white/20 after:pointer-events-none after:rounded-full
                     relative">
        <Image
          src="/logo_clean.svg"
          alt="WMV Logo"
          width={64}
          height={32}
          className="w-14 md:w-16 h-7 md:h-8 object-contain opacity-50"
        />
        <div className="flex items-center gap-1.5 md:gap-2">
          {navButtons}
          {user && (
            <div className="flex items-center gap-2 ml-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/40 rounded-full">
                <User className="w-4 h-4 text-gray-700" />
                <span className="text-sm text-gray-700 font-medium">
                  {user.email || user.phone || 'User'}
                </span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/90 hover:bg-red-600/90 text-white rounded-full transition-colors duration-200"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;