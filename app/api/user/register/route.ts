import { NextResponse } from "next/server";

const User = require("../../../models/usersModel");
const jwt = require("jsonwebtoken");

interface Register {
  email: string;
  password: string;
  admin: boolean;
}

const createToken = (_id: string) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1000d" });
};

// create a new user
export async function POST(request: Request) {
  const req: Register = await request.json();
  const { email, password, admin } = req;
  try {
    const user = await User.register(email, password, admin);

    //create a token
    const token = createToken(user._id);

    return NextResponse.json({ email, token, admin });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
