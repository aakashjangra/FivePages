import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

export const verifyJWT = async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({"message": "Unauthorized request"});
    }

    const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedInfo?._id).select("-password -refreshToken");

    if (!user) {
      res.status(401).json({ "message": "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ "message": error.message || "Unauthorized request" });
  }
}