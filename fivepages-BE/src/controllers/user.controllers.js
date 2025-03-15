import { validationResult } from "express-validator";
import User from "../models/user.models.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false }); //because we are not providing password which is a required field in user schema

    return accessToken;
  } catch (error) {
    return null;
  }
}

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  const existedUser = await User.findOne({
    email
  })

  if (existedUser) {
    return res.status(409).json({"message": "User with email or username already exists"});
  }

  const newUser = await User.create({
    name,
    email,
    password
  });

  const user = await User.findById(newUser._id).select('-password');

  res.status(200).json({ message: 'User registered successfully', user });
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!password && !email) {
    return res.status(400).json({ "message": "username and password are required" });
  }

  const user = await User.findOne({
    email
  })

  if (!user) {
    return res.status(404).json({ "message": "User does not exist!" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json({ "message": "Incorrect Password" });
  }

  const accessToken = await generateAccessToken(user._id);

  if (!accessToken) {
    return res.status(500).json({ "message": "Could not generate access token" });
  }

  const loggedInUser = await User.findById(user._id).
    select("-password");

  //for cookies
  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      {
        user: loggedInUser, accessToken,
        "message": "User logged in successfully!"
      },
    )
}

export const logoutUser = async (req, res) => {

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ "message": "User logged out!" });
}