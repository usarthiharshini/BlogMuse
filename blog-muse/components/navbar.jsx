import React,{useState,useEffect} from "react";
import Link from "next/link";

import { SearchIcon } from '@chakra-ui/icons'
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
const Navbar = ({sendNamee}) => {
  const [namee,setNamee] = useState('');
  const [query, setQuery] = useState('');
 /*  const [name,setName] = useState('harshi');
  const token = Cookies.get("token");
  const author = Cookies.get("author");
  const role = Cookies.get("role"); */

const router = useRouter();

const logout=()=>{
  Cookies.remove('name');
  Cookies.remove('author');
  Cookies.remove('token');
  Cookies.remove('id');
  const namen = Cookies.get("name");
   setNamee(namen)
   sendNamee(namen)
 }

 useEffect(()=>{
   const namen = Cookies.get("name");
   setNamee(namen)
 },[])

  const search=(e)=>{
  e.preventDefault();
  
  router.push(`/search/${query}`)
  }

  return (
    <div className="navbar">
       <div>
       <Link href="/">  <h3>Blog Muse</h3></Link>
 </div>
     
 
      <ul className="nav-list">
      <div className="search">
          <form  className="search-form" onSubmit={search} >
         <input type="text" id="name" name="search" required value={query} placeholder="e.g. product" onChange={(e) => setQuery(e.target.value)} />
            
              <button type="submit"  ><SearchIcon/></button> 
          </form>
      </div>
       {/*  <li>
          <Link href="/"> Home</Link>
        </li> */}
       
       
        {namee && <> <li className="buttons"><button className="signup" onClick={logout}> Logout</button></li> <li>
          <Link href="/createPost"> <button className="login">  Create Post </button> </Link>
        </li></>}
  {!namee &&  <>  <Link href="/login">
              <button className="login">Log In</button>
            </Link> 
            <Link href="/signup">
              
              <button className="signup">Sign Up</button>
            </Link></>  }
{/*       <li>  {(role!='reader') &&      <Link href='/createPost'> </Link>}</li>
 */}        
       
       
      </ul>
    </div>
  );
};

export default Navbar;
