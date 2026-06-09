import { AuthProviderContext, type User } from "@/hooks/useAuth";
import { getMeApi, logoutApi } from "@/api/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SuspenseUi from "@/components/ui/SuspenseUi";
// Reuse the User type from AuthProviderContext to avoid duplicate/conflicting 'User' definitions
// type ContextType = React.ContextType<typeof AuthProviderContext>;
// type User = ContextType extends { user: infer U } ? U : null;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryFn: async () => await getMeApi(),
    queryKey: ["authuser"],
    retry: false, // don't retry on failure to avoid multiple failed attempts
  });

  useEffect(() => {
    if (data && data?.status === 200) {
      const timer = setTimeout(() => {
        setUser(data?.data.data);
      }, 100);
      return () => clearTimeout(timer);
    } else if (isError) {
      const timer = setTimeout(() => {
        setUser(null);
      }, 100);
      if (import.meta.env.DEV) {
        console.log("Error authenticating", error.message);
      }
      return () => clearTimeout(timer);
    }
  }, [data, isError, error]);

  // fetch user on app load using session cookie
  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await getMeApi();
  //       if (res.status === 200) {
  //         setUser(res.data.data);
  //       }
  //     } catch {
  //       setUser(null);
  //     } finally {
  //       setIsAuthenticating(false);
  //     }
  //   }
  //   fetchUser();
  // }, []);

  const handleLogout = async () => {
    try {
      if (user?.email) {
        await logoutApi(user.email);
        queryClient.clear();
      }
      toast.success("Logout successful!");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setUser(null); // always clears user even if API fails
    }
  };

  // const refetchUser = async () => {
  //   try {
  //     const res = await getMeApi();
  //     if (res.status === 200) {
  //       setUser(res.data.data);
  //     }
  //   } catch {
  //     setUser(null);
  //   }
  // };

  if (isPending) return <SuspenseUi />;

  const contextValue = {
    user,
    setUser,
    isAuthenticating,
    setIsAuthenticating,
    handleLogout,
    // refetchUser,
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}
