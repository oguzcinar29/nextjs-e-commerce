import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;

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
  let oldImg: any;
  if (typeof file.name !== "undefined") {
    blob = await put(file.name, file, {
      access: "public",
    });
  } else {
    const findProduct = await Products.findById(id);
    oldImg = findProduct.image;
  }

  try {
    await connectMongoDB();

    await Products.findByIdAndUpdate(id, {
      title,
      description,
      category,
      price,
      image: typeof blob !== "undefined" ? blob.url : oldImg,
    });

    const products = await Products.find();

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectMongoDB();
    await Products.findByIdAndDelete(id);
    const products = await Products.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
