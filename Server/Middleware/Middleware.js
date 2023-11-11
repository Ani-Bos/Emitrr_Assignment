import jwt from "jsonwebtoken";
const JWT_SECRET = "Lingo";

const filter = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using correct token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Set the user object on req.user
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using correct token" });
  }
};

export default filter;
