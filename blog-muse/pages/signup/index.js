import React, { useEffect, useState } from "react";
import { useToast, Spinner, Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");

  const toast = useToast();
  const toastIdRef = React.useRef();
  const router = useRouter();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = await axios.post(
        `https://blog-muse.vercel.app/api/user/createUser`,
        {
          name: name,
          email: email,
          password: password,
          role: role,
        }
      );
      // console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Role: ${role}`);
      console.log(data.data);

      if (data) {
        toastIdRef.current = toast({
          title: "Account created.",
          description: "redirecting to login page",
          status: "success",
          duration: 9000,
          position: "bottom-left",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toastIdRef.current = toast({
        title: error.response.data.message,
        description: "redirecting to login page",
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }

    setTimeout(() => {
      router.push("/login");
    }, 3000);

    /*  setName('');
       setEmail('');
       setPassword('');
       setRole('');
            */
  };

  return (<div>
    <Navbar/>
  
    <div className="signup-page main">
      <h2>Create an account</h2>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="reader">Reader</option>
          <option value="author">Author</option>
        </select>

        <button type="submit">Sign up</button>
      </form>
    </div>
    </div> );
}

export default SignupPage;
