import React from 'react';


const Index = ({blogs}) => {
    console.log(blogs)
    return (
        <div>
            search
        </div>
    );
}

export default Index;

export async function getServerSideProps({params}) {
    const res = await fetch(`https://blog-muse.vercel.app/api/blogs/${params.query}`);
    const data = await res.json();
  console.log(params.query)
    return {
      props: {
        blogs: data.data,
      },
    };
  }