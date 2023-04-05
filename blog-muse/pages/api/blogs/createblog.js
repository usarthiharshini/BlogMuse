import conn from "@/database/connection/connectDB";
const User = require("../../../database/models/userModel");
const BlogPost = require("../../../database/models/blogModel");

export default async function handler(req, res) {
  conn();
  const { title, content, author,image } = req.body;

  const authorDetails = await User.findOne({
    _id: author,
  });
  console.log(authorDetails);

  if (authorDetails.role === "reader") {
    return res.status(401).json({ message: "Cannot create blog post" });
  }

  const newBlogPost = new BlogPost({
    title: title,
    content: content,
    author: author,
    image: image
  });
  const savedBlogPost = await newBlogPost.save();
  res.json(savedBlogPost);
}
