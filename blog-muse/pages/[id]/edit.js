import React, { useContext, useState } from "react";
import { useQuill } from "react-quilljs";
import authContext from "@/context/authContext";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

function HtmlEditor({postData}) {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState(postData[0].content);
  const [title, setTitle] = useState(postData[0].title);
  const [image, setImage] = useState(postData[0].image);

console.log(postData)
  const toast = useToast();
  const toastIdRef = React.useRef();
 const router = useRouter();
  const token = Cookies.get("token");
  const author = Cookies.get("author");
  const name = Cookies.get("name");
  const role = Cookies.get("role");

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
        const data =await axios.patch(`https://blog-muse.vercel.app/api/blogs/${postData[0]._id}`,{
            title: title,
            content:value,
            author:author,
            image:image
        })
        if (data.data) {
               toastIdRef.current = toast({
              title: "Post updated",
              status: "success",
              duration: 9000,
              position: "bottom-left",
              isClosable: true,
            });
        console.log(data.status)
      };
    } catch (error) {
        console.log(error);
        toastIdRef.current = toast({
          title: error.response.data.message || 'something went wrong',
         
          status: "error",
          duration: 9000,
          position: "bottom-left",
          isClosable: true,
        });
    }

    router.push('/')
  
  }
  React.useEffect(() => {
   

    
    if (quill) {
        quill.clipboard.dangerouslyPasteHTML(`<p>${value}</p>`);
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerText);
      });
    }
  }, [quill]);



  console.log(value);

  if(role==='reader'){
    return <><Navbar/><h4 style={{textAlign:"center",marginTop: '6rem'}}>You cannot edit this blog!</h4></>
  }

  return (
    <div className="db">
      <h2>Editing Post</h2>
      <div className="underline"></div>
      <div className="db-form">
        <label>
          Content:
          <div style={{ width: 600, height: 250 }}>
            <div ref={quillRef} />
          </div>{" "}
        </label>
        <form onSubmit={handleSubmit} className="signup-page db-title">
          <div className="db-input">
            {" "}
            <div className="">
              <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} />
              </label>
              <br />

              <br />

              <label>
                Image:
                <input value={image} type="text" onChange={handleImageChange} />
              </label>
              <br />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>{" "}
    </div>
  );
}

export default HtmlEditor;

export async function getServerSideProps({ params }) {


    const res = await fetch(`https://blog-muse.vercel.app/api/blogs/${params.id}`);
    const postData = await res.json();
  
    
    return { props: { postData } };
  }