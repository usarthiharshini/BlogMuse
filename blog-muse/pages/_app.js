import authContext from "@/context/authContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const updateName=(name)=>{
    setName(name);
    console.log(name)
  }
  const updateRole=(role)=>{
    setRole(role);
    console.log(role)
  }
  const updateId=(id)=>{
 setId(id);
 console.log(id)
  }

  return (
    <authContext.Provider value={{ name,  id,  role ,updateId,updateName,updateRole}}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </authContext.Provider>
  );
}
