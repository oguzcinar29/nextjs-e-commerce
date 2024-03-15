import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);

  return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);

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
