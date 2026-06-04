import { AuthProviderContext } from "@/hooks/useAuth";
// import { useQueryClient } from "@tanstack/react-query";
import { getMeApi, logoutApi } from "@/api/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  isOnboarded: boolean;
  role: string;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // const queryClient = useQueryClient();

  // fetch user on app load using session cookie
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMeApi();
        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch {
        setUser(null);
      } finally {
        setIsAuthenticating(false);
      }
    }
    fetchUser();
  }, []);

  const refetchUser = async () => {
  try {
    const res = await getMeApi();
    if (res.status === 200) {
      setUser(res.data.data);
      return res.data.data; // Return data so login handlers can wait on it if needed
    }
  } catch {
    setUser(null);
  }
};

const handleLogout = async () => {
  try {
    if (user?.email) {
      await logoutApi(user.email);
    }
    toast.success("Logout successful!");
  } catch {
    toast.error("Logout failed. Please try again.");
  } finally {
    setUser(null); // always clears user even if API fails
  }
};




  const contextValue = {
    user,
    setUser,
    isAuthenticating,
    setIsAuthenticating,
    refetchUser,
    handleLogout,
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}