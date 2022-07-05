import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts";
import { useEffect, useState } from "react";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Settings from "./routes/Settings";
import Layout from "./routes/Layout";
import Profile from "./routes/Profile";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      const resp = await fetch("/api/auth/user");
      if (resp.status !== 200) {
        return;
      }

      const data = await resp.json();
      setUser(data.email);
    };

    getCurrentUser();
  });

  return (
    <>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
