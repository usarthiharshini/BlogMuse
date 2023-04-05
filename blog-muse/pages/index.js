import Head from 'next/head'

import axios from 'axios';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blog from '@/components/blog';
import { useState } from 'react';
import { Button,ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';


export default function Home({blogs}) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    afterChange: (index) => setCurrentSlide(index),
  };

  console.log(blogs)

 /*  useEffect(async()=>{
    const data = await axios.get(`https://blog-muse.vercel.app/
api/blogs/getblogs`)
    console.log(data);
  },[])
 */
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
      <section className='home-page'>
      <h3>Blog Muse</h3>
      <div className="underline"></div>
      {/* <div className="title">
      
        
        <div className="underline"></div>
       
      </div> */}
      
      <Slider {...settings} className='slider'>
        {blogs.map((blog)=>{
          return <Blog 
          image={blog.image}
          title={blog.title}
          content={blog.content}
          id={blog._id}
          />
        })}
        </Slider>
       {/*  <p>Current slide: {currentSlide + 1}</p> */}

     
      <div className="buttons">
        <Link href='/login'>
        <button className="login">Log In</button></Link>
        <Link href='/signup'> <button className="signup">Sign Up</button></Link>
      </div>
    </section>
      </main>
    </>
  )
}

export async function getServerSideProps(){
  const data = await axios.get(`https://blog-muse.vercel.app/
api/blogs/getblogs`)
  
  return {
    props:{
      blogs: data.data
    }
  }
} 