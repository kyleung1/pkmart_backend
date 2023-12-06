import { NextResponse } from "next/server";
import { createToken } from "../../methods/createToken";
import { connectToMongo } from "../../middleware/connectToMongo";
import keyAuth from "../../middleware/keyAuth";
import { headers } from "next/headers";

const User = require("../../../../models/usersModel");

interface Register {
  email: string;
  password: string;
  admin: boolean;
}

// create a new user
export async function POST(request: Request) {
  const headersList = headers();
  const apiKey = headersList.get("apiKey");
  const req: Register = await request.json();
  const { email, password, admin } = req;
  try {
    if (keyAuth(apiKey) === false) {
      return NextResponse.json({
        error: "api key is missing or incorrect",
        status: 404,
      });
    } else {
      connectToMongo;
      const user = await User.register(email, password, admin);

      //create a token
      const token = createToken(user._id);

      return NextResponse.json({ email, token, admin });
    }
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
