const jwt = require("jsonwebtoken");

export const createToken = (_id: string) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1000d" });
};
