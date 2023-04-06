import Link from "next/link";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Textarea, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import PrivateRoute from "@/components/privateroute";

export default function Page({ data }) {
  console.log(data);

  const author = Cookies.get("author");
  const name = Cookies.get("name");
  const toast = useToast();
  const toastIdRef = React.useRef();
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  let [value, setValue] = React.useState("");

  

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `https://blog-muse.vercel.app/api/blogs/${data[0]._id}`,
        {
          data: { author: author },
        }
      );
      console.log(res);

      if (res.data) {
        toastIdRef.current = toast({
          title: "Post deleted",
          status: "success",
          duration: 9000,
          position: "bottom-left",
          isClosable: true,
        });
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
      toastIdRef.current = toast({
        title: error.response.data.message /* || 'something went wrong' */,

        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
    router.push("/");
  };

  const newcomment = {
    author_name: name,
    blogpostId: data[0]._id,
    content: comment,
    author: author,
  };

  const addComment = async () => {
    try {
      if(newcomment.content===''){
        throw new Error
      }
      const res = await axios.post(
        `https://blog-muse.vercel.app/api/blogs/addcomment`,
        newcomment
      );
      console.log(res);
      router.reload()
    } catch (error) {
      console.log(error);
      toastIdRef.current = toast({
        title:  'Comment cannot be empty',
       
        status: "error",
        duration: 9000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (<PrivateRoute>
    <div>
      <Navbar/>
    
    
      <div className="blog-post">
        
      
      <h3>{data[0].title}</h3>
      <div className="b-p">
        <img src={data[0].image} />
        <p>{data[0].content}</p>
      </div>
      <div className="buttons">
        <Link href={`/${data[0]._id}/edit`}>
          <button className="login">Edit</button>
        </Link>

        <button className="signup" onClick={deletePost}>
          Delete
        </button>
      </div>
      <div>
        <div className="comments">
          <h4>
            
            <strong>Comments:</strong>
          </h4>
          {data[0].comments <= 0 ? (
            <h5>No comments</h5>
          ) : (
            data[0].comments.map((comment) => {
              console.log(comment);
              return (
                <div className="comment-box">
                  <h4>
                 <strong>   {comment.author_name}</strong>
                  </h4>
                  <h4>{comment.content}</h4>
                </div>
              );
            })
          )}
          {/*   <Card 
          bg='pink'
          w='100%'
          m='0'
          >
  <CardBody  w='100%' p='1' m='0'>
    <p>View a summary of all your customers over the last month.</p>
  </CardBody>
</Card> */}
          <h4>
           <strong>  Leave a comment:</strong>{" "}
          </h4>

          <Textarea
            colorScheme="gray"
            value={comment}
            onChange={handleInputChange}
            placeholder="Add a comment"
            size="sm"
          />
          <button className="login" onClick={addComment}>
            comment
          </button>
        </div>
      </div>
    </div>
    </div></PrivateRoute> );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://blog-muse.vercel.app/api/blogs/${params.id}`);
  const data = await res.json();

  return { props: { data } };
}
