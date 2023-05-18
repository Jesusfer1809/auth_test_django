import React from "react";
import {Navigate} from "react-router-dom"
import { useAuthStore } from "../../store/AuthStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const user = useAuthStore((state)=> state.user)

    if (!user) return <Navigate to="/login"/>

  return (
    <div>
      <div>Protected!!</div>
      <div>{children}</div>
    </div>
  );
}

export default ProtectedRoute;
