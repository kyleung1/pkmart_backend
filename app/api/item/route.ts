import { NextResponse } from "next/server";
import { connectToMongo } from "../middleware/connectToMongo";
import { headers } from "next/headers";
import keyAuth from "../middleware/keyAuth";

const Item = require("../../../models/itemsModel");

interface Item {
  name: string;
  price: number;
  stock: number;
  desc: string;
}

// get all items
export async function GET() {
  try {
    await connectToMongo();
    const Items = await Item.find({}).sort({ createdAt: -1 });
    return NextResponse.json(Items);
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

// create a new item

export async function POST(request: Request) {
  const req: Item = await request.json();
  const { name, price, stock, desc } = req;
  const headersList = headers();
  const apiKey = headersList.get("apiKey");
  try {
    if (keyAuth(apiKey) === false) {
      return NextResponse.json({
        error: "api key is missing or incorrect",
        status: 404,
      });
    } else {
      connectToMongo();
      const item = await Item.create({ name, price, stock, desc });
      return NextResponse.json(item);
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
