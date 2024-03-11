import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import Products from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);

  const itemId = await request.json();
  console.log(itemId);

  try {
    await connectMongoDB();
    const findCard = await Cards.findById(id);
    const cardArr = findCard.productsArr;

    const findProduct = cardArr.find((item: any) => item._id === itemId);
    console.log(findProduct);
    if (!findProduct) {
      const product = await Products.findById(itemId);
      console.log(product);
      const newProduct = {
        ...product,
        count: 1,
      };
      cardArr.push(newProduct);
      await Cards.findByIdAndUpdate(id, { productsArr: cardArr });
    }
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "hey" }, { status: 200 });
}
