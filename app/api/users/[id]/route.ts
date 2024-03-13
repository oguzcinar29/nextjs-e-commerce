import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;
  console.log(id);

  const { email, name } = await request.json();
  console.log(email, name);

  try {
    await connectMongoDB();
    await Users.findByIdAndUpdate(id, { name, email });
    return NextResponse.json({ message: "succsess" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "err" }, { status: 500 });
  }
}
