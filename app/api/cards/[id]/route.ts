import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import Products from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;

  const data = await request.json();

  const itemId = typeof data.id === "undefined" ? data : data.id;
  const method = data?.method;

  try {
    await connectMongoDB();
    const findCard = await Cards.findById(id);
    const cardArr = findCard.productsArr;

    const findProduct = cardArr.find(
      (item: any) => item._id.toString() === itemId.toString()
    );

    if (!findProduct) {
      const product = await Products.findById(itemId);

      const newProduct = {
        _id: product._id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        count: 1,
      };

      cardArr.push(newProduct);
      await Cards.findByIdAndUpdate(id, { productsArr: cardArr });
    } else {
      const product = await Products.findById(itemId);

      const cards = await Cards.find();

      const findCard3 =
        cards &&
        cards?.find((item: any) => item._id.toString() === id.toString());

      const cardsArr = findCard3.productsArr;

      const findIndex = cardsArr.findIndex(
        (item: any) => item._id.toString() === itemId.toString()
      );

      if (method) {
        cardsArr[findIndex].count -= 1;
      } else {
        cardsArr[findIndex].count += 1;
      }
      await Cards.findByIdAndUpdate(id, { productsArr: cardsArr });
    }
    return NextResponse.json({ message: "hey" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;

  const itemId = await request.json();

  try {
    await connectMongoDB();
    const cards = await Cards.findById(id);

    let cardsArr = cards.productsArr;

    const newArr = cardsArr.filter(
      (item: any) => item._id.toString() !== itemId.toString()
    );

    await Cards.findByIdAndUpdate(id, { productsArr: newArr });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
