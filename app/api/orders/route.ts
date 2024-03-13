import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import Orders from "@/models/orders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { card, userId } = await request.json();

  try {
    await connectMongoDB();
    const cards = await Cards.find();
    const orders = await Orders.find();
    const findOrder = orders.find(
      (item: any) => item.userId.toString() === userId
    );

    const findCard = cards.find(
      (item: any) => item.userId.toString() === userId.toString()
    );

    if (!findOrder) {
      console.log("created");

      await Orders.create({
        productsArr: findCard.productsArr,
        userId: findCard.userId,
      });
      console.log(findCard._id);
    } else {
      const orderArr = findOrder.productsArr;

      card.map((item: any) => orderArr.push(item));

      await Orders.findByIdAndUpdate(findOrder._id, { productsArr: orderArr });

      console.log("order updated");
    }
    await Cards.findByIdAndUpdate(findCard._id, { productsArr: [] });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
