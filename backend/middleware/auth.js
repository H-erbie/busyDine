const { UnauthentiacatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthentiacatedError("Authentication invalid!");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to job routes
    console.log(payload);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.name,
      phone: payload.phone,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new UnauthentiacatedError("Authentication invalid!");
  }
});

module.exports = auth;
