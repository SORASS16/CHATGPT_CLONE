// components/GoogleSignInButton.tsx
"use client"
import { supabase } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';

const GoogleSignInButton: React.FC = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) console.error('Error:', error.message);
    else router.push('/'); // Redirect to home page after sign-in
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
