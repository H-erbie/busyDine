const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const {
  BadRequestError,
  ConflictError,
  UnauthentiacatedError,
} = require("../errors");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//register
const register = asyncHandler(async (req, res) => {
  const { fullname, email, password, phone } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) throw new ConflictError("user with email already exists");
  const user = await User.create({ fullname, email, password, phone });
  const token = user.createJWT();
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  res.status(StatusCodes.CREATED).json({ payload, token });
});

//login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  //compare passwords
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  const token = user.createJWT();
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  res.status(StatusCodes.OK).json({ token, payload });
});
const del = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const userExists = await User.findByIdAndDelete({ _id });
  if (!userExists) {
    throw new UnauthentiacatedError("Invalid credentials");
  }
  res.status(StatusCodes.OK).json({ msg: "user account deleted" });
});

module.exports = {
  register,
  login,
  del,
};
