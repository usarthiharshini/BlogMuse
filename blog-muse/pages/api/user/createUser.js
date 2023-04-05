import conn from "@/database/connection/connectDB";
const User = require("../../../database/models/userModel");

export default async function handler(req, res) {
  conn();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.body.role === "admin") {
    return res
      .status(401)
      .json({
        message: "Cannot create new admin. If you are admin, Please Login",
      });
  }

  const userexists = await User.findOne({ email: req.body.email });

if(userexists){
  return res
  .status(401)
  .json({
    message: "User exists, Please Login",
  });
}

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const newuser = new User(newUser);
  newuser.save();

  res.status(200).json(newuser);
}
