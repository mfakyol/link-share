import connectDB from "@lib/connectDB";
import PageModel from "@models/page.model";

export default async function handler(req, res) {
  const db = await connectDB();

  if (req.method != "GET") return res.status(400).json({ status: false, message: "only get method allowed." });
  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ status: false, message: "endpoint query required." });

  try {
    const page = await PageModel.findOne({ endPoint: endpoint });

    return res.status(200).json({ status: true, data: { isExist: !!page } });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Unknown error occured." });
  }
}
