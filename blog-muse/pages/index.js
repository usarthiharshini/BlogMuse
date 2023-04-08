import Head from "next/head";
import axios from "axios";
import Slider from "react-slick";
import authContext from "@/context/authContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blog from "@/components/blog";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Navbar from "@/components/navbar";

export default function Home({ blogs }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [namee, setNamee] = useState("");
  const [yourblog, setYourblog] = useState([]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const token = Cookies.get("token");
  const author = Cookies.get("author");
  const role = Cookies.get("role");

  console.log(author);
  const logout = () => {
    Cookies.remove("name");
    Cookies.remove("author");
    Cookies.remove("token");
    Cookies.remove("id");
    const namen = Cookies.get("name");
    setNamee(namen);
  };

  console.log(blogs);
  const updateNamee = (name) => {
    setNamee(name);
  };
  useEffect(() => {
    const namen = Cookies.get("name");
    setNamee(namen);
  }, []);

  useEffect(() => {
    const you = blogs.filter((blog) => {
      console.log(blog.author, "auth");
      return blog.author === author;
    });
    setYourblog(you);
    console.log(you, "written by you");
  }, []);

  return (
    <>
      <Head>
        <title>BlogMuse</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blogmuse-website-favicon-color.png" />
      </Head>
      <main>
        <Navbar sendNamee={updateNamee} />
        <section className="home-page">
          {namee && (
            <>
              <h4 className="intro">Hey,{namee}</h4>
            </>
          )}
          <h3>Trending Blogs</h3>
          <div className="underline"></div>

          <Slider {...settings} className="slider">
            {blogs.map((blog) => {
              return (
                <Blog
                  image={blog.image}
                  title={blog.title}
                  content={blog.content}
                  id={blog._id}
                  key={blog._id}
                />
              );
            })}
          </Slider>

          {namee && yourblog.length > 0 && (
            <>
              {" "}
              <h3>Written by you</h3>
              <div className="underline"></div>
              <Slider {...settings} className="slider">
                {yourblog.map((blog) => {
                  return (
                    <Blog
                      image={blog.image}
                      title={blog.title}
                      content={blog.content}
                      id={blog._id}
                      key={blog._id}
                    />
                  );
                })}
              </Slider>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = await axios.get(
    `https://blog-muse.vercel.app/api/blogs/getblogs`
  );

  return {
    props: {
      blogs: data.data,
    },
  };
}
