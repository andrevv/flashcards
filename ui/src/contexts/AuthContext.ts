import { createContext } from "react";

interface AuthContext {
  user: string;
  signIn: (email: string, password: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

export default createContext<AuthContext>(null!);
