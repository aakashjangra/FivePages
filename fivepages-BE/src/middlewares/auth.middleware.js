import jwt from 'jsonwebtoken'
import User from '../models/user.models.js';

export const verifyJWT = async (req, res, next) => {
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

export const verifyAdmin = async (req, res, next) => {
  if (!req.user.admin) {
    return res.status(403).json({ message: 'Admin access only!' });
  }
}