import { connectMongoDB } from "@/lib/mongodb";
import Orders from "@/models/orders";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectMongoDB();
    const orders = await Orders.find();
    const findOrder = orders.find((item: any) => item.userId.toString() === id);
    const ordersArr = findOrder?.productsArr;
    return NextResponse.json({ ordersArr }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "success" }, { status: 200 });
  }
}
