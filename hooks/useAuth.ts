// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const data = supabase.auth.getSession();
    console.log(data);
    // setSession(data);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session };
}
