import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

export default async function userAuth(authorization: string | null) {
  if (!authorization) {
    return false;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id }).select("_id");
    if (user) {
      return true;
    }
  } catch (error) {
    return false;
  }
}
