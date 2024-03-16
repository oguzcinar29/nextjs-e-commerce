import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/categories";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    const categories = await Category.find();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "success" }, { status: 200 });
  }
}
