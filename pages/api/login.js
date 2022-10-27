import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@lib/connectDB";
import UserModel from "@models/user.model";

export default async function handler(req, res) {
  await connectDB();
  if ("POST" != req.method) {
    res.statusMessage = "only post method allowed.";
    return res.status(400).end();
  }
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusMessage = "email and password required for the body.";
    return res.status(400).end();
  }
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(200).json({ status: false, message: "email not found." });
  const isSame = bcrypt.compareSync(password, user.hash);
  if (!isSame) return res.status(200).json({ status: false, message: "invalid password." });
  const token = jwt.sign({ sub: user.email }, process.env.JWT_SECRET);
  return res.status(200).json({ status: true, token });
}
