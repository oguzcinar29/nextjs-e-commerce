import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";
export async function PUT(request: NextRequest, { params }: any) {
  const { id } = params;

  const { email, name, password } = await request.json();

  try {
    await connectMongoDB();

    if (password) {
      const encrpytPass = await bcrypt.hash(password, 10);
      await Users.findByIdAndUpdate(id, { name, email, password: encrpytPass });
    } else {
      const findUser = await Users.findById(id);
      await Users.findByIdAndUpdate(id, {
        name,
        email,
        password: findUser.password,
      });
    }
    const users = await Users.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "err" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await connectMongoDB();
    await Users.findByIdAndDelete(id);
    const users = await Users.find({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
