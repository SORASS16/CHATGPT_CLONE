// components/LogoutButton.tsx
import { supabase } from '../utils/supabase/client';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error:any) {
      console.error('Error logging out:', error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
