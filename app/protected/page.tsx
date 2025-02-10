// app/protected/page.tsx
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProtectedPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post('/api/auth/refresh');
        if (res.data.token) {
          // Update the token in your session or local storage
        } else {
          signIn();
        }
      } catch (error) {
        signIn();
      }
    };

    if (!session) {
      refreshToken();
    }
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
};

export default ProtectedPage;
