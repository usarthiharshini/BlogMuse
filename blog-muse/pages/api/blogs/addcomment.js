import BlogPost from "@/database/models/blogModel";
import conn from "@/database/connection/connectDB";

export default async function handler(req, res) {
  try {
    conn();
    const { blogpostId, author, content } = req.body;
    const post = await BlogPost.findById(blogpostId);

    const comment = {
      author: author,
      content: content,
    };
    post.comments.push(comment);
    await post.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
