import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Settings from "./routes/Settings";
import Layout from "./routes/Layout";
import Profile from "./routes/Profile";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "./components/AuthProvider";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route path="/" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
