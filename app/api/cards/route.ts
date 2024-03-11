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
    let cards = await Cards.find();
    const findCard = cards.find(
      (item: any) => item.userId.toString() === userId.toString()
    );

    card?.forEach((item: any) => findCard?.productsArr.push(item));

    const cardId = typeof findCard?._id !== "undefined" ? findCard?._id : "";

    if (typeof findCard === "undefined") {
      await Cards.create({ productsArr: card, userId });
      const newArr = card;
      const findCard2 = await Cards.find();
      console.log(findCard2);

      // heree find card id

      return NextResponse.json({ newArr, cardId }, { status: 200 });
    } else {
      await Cards.findByIdAndUpdate(findCard?._id, {
        productsArr: findCard?.productsArr,
      });

      const newArr = findCard?.productsArr;

      return NextResponse.json({ newArr, cardId }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Oppss! Something went wrong" },
      { status: 500 }
    );
  }
}
