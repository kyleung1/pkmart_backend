import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { connectToMongo } from "@/app/api/middleware/connectToMongo";
const mongoose = require("mongoose");
const User = require("../../../../../models/usersModel");

interface Item {
  _id?: string;
  name?: string;
  price?: number;
  stock?: number;
  __v?: number;
  desc?: string;
}

// get a single user
export async function GET(request: Request) {
  try {
    connectToMongo();
    const url = request.url;
    const splitUrl = url.split("/");
    const id = splitUrl[splitUrl.length - 1];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "No such user" });
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "No such user" });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

//delete a user
export async function DELETE(request: Request) {
  try {
    connectToMongo();
    const url = request.url;
    const splitUrl = url.split("/");
    const id = splitUrl[splitUrl.length - 1];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "No such user" });
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "No such user" });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

//update a user
// needs to add token hashing
export async function PATCH(request: Request) {
  try {
    connectToMongo();
    const url = request.url;
    const splitUrl = url.split("/");
    const id = splitUrl[splitUrl.length - 1];
    const req: any = await request.json();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "No such user" });
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req,
      }
    );

    if (!user) {
      return NextResponse.json({ error: "No such user" });
    }
    return NextResponse.json("user");
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
