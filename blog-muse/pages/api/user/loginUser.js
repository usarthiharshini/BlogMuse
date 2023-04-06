import conn from "@/database/connection/connectDB";

const jwt = require("jsonwebtoken");
const User = require("../../../database/models/userModel");
export default async function handler(req, res) {
  conn();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (password != user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({
    token: token,
    message: " Login successful",
    name: user.name,
    role: user.role,
    id: user._id,
  });
}
