import conn from "@/database/connection/connectDB";

const jwt = require("jsonwebtoken");
const User = require("../../../database/models/userModel");
//https://blog-muse.vercel.app/
export default async function handler(req, res) {
  conn();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const { email, password } = req.body;
  console.log(email);

  // Check if the email and password were provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  // Retrieve the user from the database
  const user = await User.findOne({ email });

  console.log(user);

  // Check if the user was found
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (password != user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  // Send the token in the response
  res.json({
    token: token,
    message: " Login successful",
    name: user.name,
    role: user.role,
    id: user._id,
  });
}
