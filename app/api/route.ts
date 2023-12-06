// const Item = require("../../../models/itemsModel");
// const User = require("../../../models/usersModel");

import { NextResponse } from "next/server";

function GET() {
  return NextResponse.json(null, { status: 204 });
}
