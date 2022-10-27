import bcrypt from "bcrypt";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import connectDB from "@lib/connectDB";
import UserModel from "@models/user.model";
import PageModel from "@models/page.model";
import { validateEmail, validatePassword } from "@lib/validator";

export default async function handler(req, res) {
  await connectDB();

  if (req.method != "POST") {
    res.statusMessage = "only post method allowed.";
    return res.status(400).end();
  }

  const { email, endPoint, password } = req.body;

  if (!email || !endPoint || !password) {
    res.statusMessage = "email, endPoint, password required for the body.";
    return res.status(400).end();
  }

  const emailValidationError = validateEmail(email);

  if (emailValidationError) return res.status(200).json({ status: false, message: emailValidationError });

  const passwordValidationError = validatePassword(password);

  if (passwordValidationError) return res.status(200).json({ status: false, message: passwordValidationError });

  if (endPoint.length < 3 || endPoint.length > 32)
    return res.status(200).json({ status: false, message: "endPoint must be minimum 3 and maximum 32 characters." });

  if (endPoint != slugify(endPoint, { lower: true }))
    return res
      .status(200)
      .json({ status: false, message: "endPoint must be lowercase and url must be url safe(slug)." });

  let user;
  let page;
  let errorFlag = 0;

  try {
    page = new PageModel({ endPoint });

    await page.save();

    errorFlag = 1;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    user = new UserModel({ email, salt, hash, page: page._id });

    await user.save();
  } catch (error) {
    if (error.code == 11000) {
      if (errorFlag == 0) {
        return res.status(200).json({ status: false, message: "This end point is already using." });
      } else {
        await PageModel.deleteOne({ endPoint });
        return res.status(200).json({ status: false, message: "This email is already registered." });
      }
    }

    return res.status(500).json({ status: false, message: "Unknown error occured." });
  }

  const token = jwt.sign({ sub: user.email }, process.env.JWT_SECRET);

  return res.status(200).json({ status: true, token });
}
