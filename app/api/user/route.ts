import { NextResponse } from "next/server";
import { connectToMongo } from "../middleware/connectToMongo";
import { headers } from "next/headers";
import keyAuth from "../middleware/keyAuth";

const User = require("../../../models/usersModel");

// get all users
export async function GET() {
  const headersList = headers();
  const apiKey = headersList.get("apiKey");
  try {
    if (keyAuth(apiKey) === false) {
      return NextResponse.json({
        error: "api key is missing or incorrect",
        status: 404,
      });
    } else {
      await connectToMongo();
      const users = await User.find({}).sort({ createdAt: -1 });
      return NextResponse.json(users);
    }
  } catch (e: unknown) {
    if (e instanceof Error)
      return NextResponse.json(
        {
          error: e.message,
        },
        {
          status: 500,
        }
      );
  }
}
