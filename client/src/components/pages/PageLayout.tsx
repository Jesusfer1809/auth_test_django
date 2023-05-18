/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { useEffect } from "react";

function PageLayout() {
  const updateToken = useAuthStore((state) => state.updateToken);
  const authTokens = useAuthStore((state) => state.authTokens);

  const tenMinutes = 1000 * 60 * 10;

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken(authTokens);
      }
    }, tenMinutes);
    return () => clearInterval(interval);
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) {
      updateToken(authTokens);
    }
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="bg-stone-700 h-20 flex items-center justify-center gap-x-8">
        <Link to="/">
          <div className="text-lg font-medium text-white">Index page</div>
        </Link>

        <Link to="/login">
          <div className="text-lg font-medium text-white">Login page</div>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default PageLayout;
