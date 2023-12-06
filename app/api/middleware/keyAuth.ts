import { NextResponse } from "next/server";

export default function keyAuth(apiKey: string | null) {
  if (!apiKey) {
    return false;
  } else if (apiKey !== process.env.APIKEY) {
    return false;
  }
  return true;
}
