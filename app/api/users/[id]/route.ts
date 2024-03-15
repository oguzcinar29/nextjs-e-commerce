import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);

  const { email, name } = await request.json();
  console.log(email, name);

  try {
    await connectMongoDB();
    await Users.findByIdAndUpdate(id, { name, email }).populate("creator");
    return NextResponse.json({ message: "succsess" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "err" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);

  try {
    await connectMongoDB();
    await Users.findByIdAndDelete(id);
    const users = await Users.find({}).populate("creator");
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
