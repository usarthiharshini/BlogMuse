import conn from "@/database/connection/connectDB";
const User = require("../../../database/models/userModel");

export default function handler(req, res) {
  conn();

  if (req.body.role === "admin") {
    return res
      .status(401)
      .json({
        message: "Cannot create new admin. If you are admin, Please Login",
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
