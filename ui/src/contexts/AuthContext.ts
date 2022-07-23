import { createContext } from "react";

interface AuthContext {
  user: string;
  signIn: (email: string, password: string, callback: VoidFunction) => Promise<void>;
  signOut: (callback: VoidFunction) => Promise<void>;
}

export default createContext<AuthContext>(null!);
