import { NextResponse } from "next/server";
import { createToken } from "../../methods/createToken";
import { connectToMongo } from "../../middleware/connectToMongo";
const User = require("../../../../models/usersModel");

interface Login {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const req: Login = await request.json();
  const { email, password } = req;

  try {
    connectToMongo();
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    //check if admin
    const admin = user.admin;

    return NextResponse.json({ email, token, admin });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json(
        { error: error.message },
        {
          status: 500,
        }
      );
  }
}
