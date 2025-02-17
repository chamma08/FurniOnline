import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.header;
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });
    const token_decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      return res.status(400).json({ msg: "Invalid Authentication" });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export default adminAuth;