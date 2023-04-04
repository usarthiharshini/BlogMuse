import BlogPost from "@/database/models/blogModel";
import conn from "@/database/connection/connectDB";

export default async function handler(req, res) {
  try {
    conn();
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}
