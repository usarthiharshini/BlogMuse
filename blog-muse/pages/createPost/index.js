import React, { useContext, useState } from "react";
import { useQuill } from "react-quilljs";
import authContext from "@/context/authContext";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import PrivateRoute from "@/components/privateroute";
import Search from "@/components/search";
import Navbar from "@/components/navbar";


function HtmlEditor() {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
 

  const toast = useToast();
  const toastIdRef = React.useRef();

  const token = Cookies.get("token");
  const author = Cookies.get("author");
  const name = Cookies.get("name");
  const role = Cookies.get("role");
  const router = useRouter();

  console.log(name, "name");
  console.log(author, "author");



 
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Handle form submission
    try {
        const data =await axios.post(`https://blog-muse.vercel.app/api/blogs/createblog`,{
            title: title,
            content:value,
            author:author,
            image:image
        })
        if (data.data) {
               toastIdRef.current = toast({
              title: "Post created",
              status: "success",
              duration: 9000,
              position: "bottom-left",
              isClosable: true,
            });
        console.log(data.status)
      };
      router.push('/')
    } catch (error) {
        console.log(error);
        toastIdRef.current = toast({
          title: error.response.data.message || 'Fill all details',
         
          status: "error",
          duration: 9000,
          position: "bottom-left",
          isClosable: true,
        });
    }
    

   
  
  }
  React.useEffect(() => {
    
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerText);
      });
    }
    
  }, [quill]);

  console.log(value);

 



  return (
    <PrivateRoute>
    <div>
     <Navbar/>
    <div className="db main">
      <h2>Create New Post</h2>
      <div className="underline"></div>
      <div className="db-form">
        <div>
          Content:
          <div style={{ width: 600, height: 250 }}>
            <div aria-required ref={quillRef} />
          </div>{" "}
        </div>
        <form onSubmit={handleSubmit} className="signup-page db-title">
          {/* <div className="db-input"> */}
            {" "}
            {/* <div className=""> */}
              <label>
                Title:
                <input required  type="text" value={title} onChange={handleTitleChange} />
              </label>
              {/* <br />

              <br /> */}

              <label>
                Image:
                <input required value={image} type="text" onChange={handleImageChange} />
              </label>
             
          <button type="submit">Submit</button>
        </form>
      </div>{" "}
    </div>
  </div></PrivateRoute>);
}

export default HtmlEditor;
