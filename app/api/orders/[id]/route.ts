import { connectMongoDB } from "@/lib/mongodb";
import Orders from "@/models/orders";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  console.log("hey123");

  const { id } = params;
  console.log(id);

  try {
    await connectMongoDB();
    const orders = await Orders.find();
    const findOrder = orders.find((item: any) => item.userId.toString() === id);
    console.log(findOrder);
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "success" }, { status: 200 });
}
