import { AuthProviderContext } from "@/hooks/useAuth";
// import { useQueryClient } from "@tanstack/react-query";
import { getMeApi } from "@/api/auth";
import { useEffect, useState } from "react";
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

  // const mutation = useMutation({
  //   mutationFn: getMeApi,
  //   onSuccess: (res) => {
  //     console.log("eee", res);
  //     //toast.success(res?.data?.message || "Logout Successful");
  //     queryClient.clear();
  //     setUser(null);
  //   },
  //   onError: (error) => {
  //     if (import.meta.env.DEV) {
  //       console.error(error);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   mutation.mutate();
  // }, [mutation]);

  // const handleLogout = () => mutation.mutate();

  // if (isAuthenticating) {
  //   return <div>Loading...</div>; // replace with your spinner if you have one
  // }

  const contextValue = {
    user,
    setUser,
    isAuthenticating,
    setIsAuthenticating,
    // handleLogout,
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}
