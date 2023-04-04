// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import conn from "@/database/connection/connectDB"

export default function handler(req, res) {
  conn();
  res.status(200).json({ name: 'John Doe' })
}
