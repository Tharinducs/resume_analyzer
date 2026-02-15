import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export const verifyAuthToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
