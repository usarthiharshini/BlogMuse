import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return children;
};

export default PrivateRoute;
