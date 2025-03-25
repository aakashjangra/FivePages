import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ "message": "Unauthorized request" });
    }

    const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedInfo?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ "message": "Invalid Access Token" });
    }

    req.user = user;
    next();  // ✅ Call next only once after validation
  } catch (error) {
    return res.status(401).json({ "message": error.message || "Unauthorized request" });
  }
};
