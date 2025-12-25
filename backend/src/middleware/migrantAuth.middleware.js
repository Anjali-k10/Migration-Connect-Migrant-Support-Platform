import jwt from "jsonwebtoken";

const migrantAuth = (req, res, next) => {
  try {
    const token = req.cookies?.migrant_token;

    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.migrant = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default migrantAuth;
