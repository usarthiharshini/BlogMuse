import conn from "@/database/connection/connectDB";
import BlogPost from "@/database/models/blogModel";



export default async function handler(req, res) {
    try {
        conn();
        const { search } = req.query;
        console.log(search,"search")
    const result=    await BlogPost.find({ title: { $regex: search, $options: 'i' } })
           
          res.json(result);
    } catch (error) {
      console.log(error)
        res.status(500).json({ message: "something went wrong" });
    }
}

