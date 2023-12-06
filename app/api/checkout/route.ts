import { NextResponse, NextRequest } from "next/server";
const Item = require("../../../models/itemsModel");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
import { connectToMongo } from "../middleware/connectToMongo";

var storeItems = [];

interface Amount {
  id: string;
  name: string;
  quantity: number;
}

interface Checkout {
  items: Amount[];
}

export async function POST(request: Request) {
  const req: Checkout = await request.json();
  try {
    await connectToMongo();
    if (req.items) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: await Promise.all(
          req.items.map(async (item: Amount) => {
            const storeItem = await Item.findById(item.id);
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: storeItem.name,
                },
                unit_amount: storeItem.price * 100, //tempPrice * 100
              },
              quantity: item.quantity,
            };
          })
        ),
        success_url: "http://localhost:" + process.env.PORTCLIENT + "/success",
        cancel_url: "http://localhost:" + process.env.PORTCLIENT + "/fail",
      });
      return NextResponse.json({ url: session.url });
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
  storeItems = [];
}
