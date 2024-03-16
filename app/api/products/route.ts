import Products from "@/models/products";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import Category from "@/models/categories";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const data = await Products.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Oppss! Something went wrong on our end." },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  const form = await request.formData();

  const title = form.get("title");
  const category = form.get("category");
  const description = form.get("description");
  const price = form.get("price");
  const file: File | null = form.get("picture") as unknown as File;

  const containsLetter = (price: any) => {
    for (let char of price) {
      if (/[a-zA-Z]/.test(char)) {
        return true;
      }
    }
    return false;
  };

  const hasALetter = containsLetter(price);

  if (hasALetter) {
    return NextResponse.json(
      { message: "Price has to be number!" },
      { status: 422 }
    );
  }

  if (!category) {
    return NextResponse.json(
      { message: "You have to select a category" },
      { status: 422 }
    );
  }

  let blob: any;
  if (typeof file.name !== "undefined") {
    blob = await put(file.name, file, {
      access: "public",
    });
  } else {
    return NextResponse.json(
      { message: "You have to add a image." },
      { status: 422 }
    );
  }

  try {
    await connectMongoDB();

    await Products.create({
      title,
      description,
      category,
      price,
      image: typeof blob !== "undefined" ? blob.url : null,
    });
    const products = await Products.find();

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
