const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({ msg: "problem with header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      // middleware passes user id to req and returns usreId of that particular HEader
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ msg: "problem inside jwt decode" });
    }
  } catch (err) {
    return res.status(403).json({ msg: "problem after decode jwt" });
  }
};
module.exports = {
  authMiddleware,
};
