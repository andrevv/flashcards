import { useEffect, useState } from "react";
import { ReactNode } from "react";
import AuthContext from "../contexts/AuthContext";
import Loader from "./Loader";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const resp = await fetch("/api/auth/me");
      if (resp.status !== 200) {
        setIsLoading(false);
        return;
      }

      const data = await resp.json();
      setUser(data.email);
      setIsLoading(false);
    };

    getCurrentUser();
  }, []);

  const signIn = (email: string, password: string, callback: VoidFunction) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          // setError(data.error);
          return;
        }

        setUser(data.user);
        callback();
      });
  };

  const signOut = (callback: VoidFunction) => {
    fetch("/api/auth/logout", {
      method: "POST",
    })
    .then(() => {
      setUser(null);
      callback();
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}
