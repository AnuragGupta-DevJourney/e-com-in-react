import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const { user } = useUser();
  const naviagte = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error("plz login to access Cart Page");
      naviagte("/");
      return;
    }
  });

  return <>{user ? children : <Navigate to={"/"} />}</>;
}

export default ProtectRoute;
