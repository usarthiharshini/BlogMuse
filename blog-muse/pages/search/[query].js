import Navbar from '@/components/navbar';
import React, { useEffect } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blog from "@/components/blog";

const Query = ({blogs}) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index) => setCurrentSlide(index),
  };

    console.log(blogs)

    return (
        <div>
            <Navbar/>
            <div className='main'>
              
            
            <h2>Search results</h2>
 <div className="underline"></div></div>

 <Slider {...settings} className="slider">
            {blogs.map((blog) => {
              return (
                <Blog
                  image={blog.image}
                  title={blog.title}
                  content={blog.content}
                  id={blog._id}
                  key={blog._id}
                />)})}</Slider>
        </div>
    );
}

export default Query;

export async function getServerSideProps({params}) {
  const res = await fetch(`https://blog-muse.vercel.app/api/blogs/search/${params.query}`);
  const data = await res.json();
  console.log(data)
console.log(params.query)
  return {
    props: {
      blogs: data,
    },
  };
}