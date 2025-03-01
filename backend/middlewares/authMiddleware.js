import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing! Check .env file.");
      return res.status(500).json({ message: "Server error: Missing JWT_SECRET" });
    }

    // ✅ Extract the token correctly
    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    // ✅ Verify the token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded; // Store user ID for further use

    next();
  } catch (error) {
    console.error("❌ Token Verification Failed:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
