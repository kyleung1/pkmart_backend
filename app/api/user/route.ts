import { NextResponse } from "next/server";
import { connectToMongo } from "../middleware/connectToMongo";

const User = require("../../../models/usersModel");

// get all users
export async function GET() {
  try {
    await connectToMongo();
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(users);
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
