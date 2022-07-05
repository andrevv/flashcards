import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
