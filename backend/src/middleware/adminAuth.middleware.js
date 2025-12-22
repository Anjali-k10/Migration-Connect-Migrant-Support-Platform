import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }


    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default adminAuth;
