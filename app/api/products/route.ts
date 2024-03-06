import Products from "@/models/products";
import { connectMongoDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

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
