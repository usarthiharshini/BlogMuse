import { useRouter } from 'next/router';
import React,{useEffect, useState} from 'react';

import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const router = useRouter();

    /*  if(!token) {
         router.push("/login");
     } */
     useEffect(() => {
         // Get the token cookie using next-cookies
         const token = Cookies.get("token");
         // If the token cookie doesn't exist, redirect to the login page
         if (!token) {
           router.push('/login');
         }
       }, []);

  return children;
};

export default PrivateRoute;
