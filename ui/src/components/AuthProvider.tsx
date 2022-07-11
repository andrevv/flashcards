import { useEffect, useState } from "react";
import { ReactNode } from "react";
import AuthContext from "../contexts/AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string>();

  useEffect(() => {
    const getCurrentUser = async () => {
      const resp = await fetch("/api/auth/me");
      if (resp.status !== 200) {
        return;
      }

      const data = await resp.json();
      setUser(data.email);
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

  const signOut = () => {};

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
