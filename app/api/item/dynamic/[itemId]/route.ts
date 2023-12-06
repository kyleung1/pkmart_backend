import { NextResponse } from "next/server";
import { connectToMongo } from "../../../middleware/connectToMongo";
const mongoose = require("mongoose");
const Item = require("../../../../../models/itemsModel");

interface Item {
  name: string;
  price: number;
  stock: number;
  desc: string;
}

// get a single item
export async function GET(request: Request) {
  try {
    connectToMongo();
    const url = request.url;
    const splitUrl = url.split("/");
    const id = splitUrl[splitUrl.length - 1];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "No such item" },
        {
          status: 404,
        }
      );
    }
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json(
        { error: "No such item" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(item);
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

// delete an item
export async function DELETE(request: Request) {
  try {
    connectToMongo();
    const url = request.url;
    const splitUrl = url.split("/");
    const id = splitUrl[splitUrl.length - 1];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "No such item" },
        {
          status: 404,
        }
      );
    }

    const item = await Item.findOneAndDelete({ _id: id });

    if (!item) {
      return NextResponse.json(
        { error: "No such item" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(item);
  } catch (error: unknown) {
    if (error instanceof Error)
      return (
        NextResponse.json({ error: error.message }),
        {
          status: 500,
        }
      );
  }
}

// update an item
export async function PATCH(request: Request) {
  try {
    connectToMongo();
    const url = request.url;
    const splitUrl = url.split("/");
    const id = splitUrl[splitUrl.length - 1];
    const req: Item = await request.json();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "No such item" },
        {
          status: 404,
        }
      );
    }

    const item = await Item.findOneAndUpdate(
      { _id: id },
      {
        ...req,
      }
    );

    if (!item) {
      return NextResponse.json(
        { error: "No such item" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(item);
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
