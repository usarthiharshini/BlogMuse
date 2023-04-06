import BlogPost from "@/database/models/blogModel";
import User from "@/database/models/userModel";
import conn from "@/database/connection/connectDB";

export default async function handler(req, res) {
  try {
    conn();
    const { getblogbyid } = req.query;

    switch (req.method) {
      case "GET": {
        const blogs = await BlogPost.find({ _id: getblogbyid });
        console.log(blogs);
        res.json(blogs);
        break;
      }
      case "PATCH": {
        const { content, author,title,image } = req.body;
        const authorDetails = await User.findOne({
          _id: author,
        });

        const postDetails = await BlogPost.findOne({ _id: getblogbyid });

        if (
          authorDetails.role === "reader" ||
          (authorDetails.role === "author" &&
            postDetails.author != authorDetails.id)
        ) {
          return res.status(401).json({ message: "Cannot edit post" });
        }

        const blog = await BlogPost.findByIdAndUpdate(
          getblogbyid,
          { content: content,title: title,image: image },
          { new: true }
        );
        res.json(blog);
        break;
      }
      case "DELETE": {
        const { author } = req.body;
        const authorDetails = await User.findOne({
          _id: author,
        });

        const postDetails = await BlogPost.findOne({ _id: getblogbyid });

        if (
          authorDetails.role === "reader" ||
          (authorDetails.role === "author" &&
            postDetails.author != authorDetails.id)
        ) {
          return res.status(401).json({ message: "Cannot delete post" });
        }

        const blog = await BlogPost.findByIdAndDelete(getblogbyid);
        res.json({ blog: blog, message: "Deleted post" });
        break;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}
