import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { card, email } = await request.json();

  try {
    await connectMongoDB();
    const user = await Users.find({ email });
    const userId = user[0]?._id;

    const cards = await Cards.find();

    const findCard = cards.find(
      (item: any) => item.userId[0].toString() === userId.toString()
    );
    console.log(findCard?._id);

    if (typeof findCard === "undefined") {
      await Cards.create({ productsArr: card, userId });
    } else {
      await Cards.findByIdAndUpdate(findCard?._id, { productsArr: card });
    }
    return NextResponse.json({ card }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Oppss! Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "hey" }, { status: 200 });
}
