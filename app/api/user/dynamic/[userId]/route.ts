import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { connectToMongo } from "@/app/api/middleware/connectToMongo";
import { headers } from "next/headers";
import keyAuth from "@/app/api/middleware/keyAuth";
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
      return NextResponse.json(
        { error: "No such user" },
        {
          status: 404,
        }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { error: "No such user" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(user);
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

//delete a user
export async function DELETE(request: Request) {
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
      const url = request.url;
      const splitUrl = url.split("/");
      const id = splitUrl[splitUrl.length - 1];
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "No such user" },
          {
            status: 404,
          }
        );
      }

      const user = await User.findOneAndDelete({ _id: id });

      if (!user) {
        return NextResponse.json(
          { error: "No such user" },
          {
            status: 404,
          }
        );
      }
      return NextResponse.json(user);
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

//update a user
// needs to add token hashing
export async function PATCH(request: Request) {
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
      const url = request.url;
      const splitUrl = url.split("/");
      const id = splitUrl[splitUrl.length - 1];
      const req: Item = await request.json();
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "No such user" },
          {
            status: 404,
          }
        );
      }

      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          ...req,
        }
      );

      if (!user) {
        return NextResponse.json(
          { error: "No such user" },
          {
            status: 404,
          }
        );
      }
      return NextResponse.json(user);
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
