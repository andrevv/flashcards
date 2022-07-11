import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
