// components/Navbar.tsx
'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          SecureAuthApp
        </Link>
        <div>
          {session ? (
            <>
              <Link href="/protected" className="text-white mr-4">
                Protected
              </Link>
              <button onClick={() => signOut()} className="text-white">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="text-white mr-4">
                Sign In
              </Link>
              <Link href="/auth/signup" className="text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
