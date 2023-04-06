import BlogPost from "@/database/models/blogModel";
import conn from "@/database/connection/connectDB";

export default async function handler(req, res) {
  console.log(req.body);
  try {
    conn();
    const { blogpostId, author, content,author_name } = req.body;
    
    const post = await BlogPost.findById(blogpostId);

    const comment = {
      author: author,
      author_name: author_name,
      content: content,
    };
    post.comments.push(comment);
    await post.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "something went wrong" });
  }
}
