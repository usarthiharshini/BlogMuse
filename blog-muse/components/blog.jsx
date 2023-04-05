import React from 'react';
import Link from 'next/link';

const Blog = ({image,title,content,id}) => {
    return (
        <Link href={`/${id}`}>  <article className='blog'>
            <img src={image} />
            <footer>
                <h4>{title}</h4>
                <p>{content}</p>
            </footer>
        </article></Link>
    );
}

export default Blog;
