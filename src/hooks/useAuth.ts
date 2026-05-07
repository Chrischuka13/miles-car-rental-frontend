import { useContext, createContext } from "react";

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



interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticating: boolean;
  setIsAuthenticating: (value: boolean) => void;
    // handleLogout: () => void;
}

const initialState: AuthContextType = {
  user: null,
  setUser: () => null,
  isAuthenticating: false,
  setIsAuthenticating: () => null,
  //  handleLogout: () => null,
};

// create the store
export const AuthProviderContext = createContext<AuthContextType>(initialState);

// hook to consume the values provided by the auth provider context
export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (context === undefined) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};