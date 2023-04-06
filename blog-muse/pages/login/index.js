import React, { useContext, useState } from 'react';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from 'next/link';
import authContext from "@/context/authContext";
import Cookies from 'js-cookie';
import axios from "axios";
import Navbar from '@/components/navbar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();
  const toastIdRef = React.useRef();
  const router = useRouter();
 const {name,id,role,updateName,updateId,updateRole} = useContext(authContext)
  const handleSubmit = async (event) => {
    try {
        
   
    event.preventDefault();
    // Handle login logic here

    const data = await axios.post(
        `https://blog-muse.vercel.app/api/user/loginUser`,
        {
        
          email: email,
          password: password,
         
        }
      );
     

      if (data.data) {
        Cookies.set('token',data.data.token, { expires: 7 });
        Cookies.set('name',data.data.name, { expires: 7 });
        Cookies.set('author',data.data.id, { expires: 7 });
        Cookies.set('role',data.data.role, { expires: 7 });
          updateName(data.data.name)
         updateId(data.data.id)
          updateRole(data.data.role)
          console.log(name,id,role+"details")
           toastIdRef.current = toast({
          title: "Login succesful.",
          description: "redirecting to dashboard",
          status: "success",
          duration: 9000,
          position: "bottom-left",
          isClosable: true,
        });
       setTimeout(()=>{
router.push("/");
       },2000)
            
        
      }
    } 
 catch (error) {
    console.log(error);
    toastIdRef.current = toast({
      title: error.response.data.message,
      description: "Please try again",
      status: "error",
      duration: 9000,
      position: "bottom-left",
      isClosable: true,
    });
}
  }

  return (<>
    <Navbar/>
    <div className='signup-page main'>
      
      <h2>Login</h2>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <div className='external-link'>
       <Link href='/signup'> create new account</Link></div> 
        <button type="submit">Login</button>
      </form>
    </div>
    </>);
}

export default LoginPage;
