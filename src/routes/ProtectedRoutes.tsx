import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticating } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  useEffect(() => {
    if (!isAuthenticating && user) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
  }, [user, isAuthenticating, from, location, navigate]);

  return children;
}

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticating } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/auth/login";

  useEffect(() => {
    if (!isAuthenticating && !user) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
  }, [user, isAuthenticating, from, location, navigate]);

  return children;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticating } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticating && !user) {
      navigate("/auth/login", {
        state: { from: location },
        replace: true,
      });
    }
    if (!isAuthenticating && user && user.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, isAuthenticating, location, navigate]);

  return children;
}