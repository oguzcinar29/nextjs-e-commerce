import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/categories";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const categories = await Category.find();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { newCategory } = await request.json();
  console.log(newCategory);

  try {
    await connectMongoDB();
    if (newCategory === "") {
      return NextResponse.json(
        { message: "The category cant be empty" },
        { status: 422 }
      );
    }
    const categories = await Category.find();

    const findCategory = categories.find(
      (item: any) => item.name === newCategory
    );
    console.log(findCategory);

    if (!findCategory) {
      await Category.create({ name: newCategory });
      const categories2 = await Category.find();
      return NextResponse.json({ categories2 }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "The category already exist!" },
        { status: 422 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
