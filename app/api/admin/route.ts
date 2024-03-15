import { connectMongoDB } from "@/lib/mongodb";
import Orders from "@/models/orders";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const orders = await Orders.find();

    console.log(orders);

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
