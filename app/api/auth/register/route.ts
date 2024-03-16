import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";

const saltRounds = 10;

export async function POST(request: NextRequest) {
  const { name, email, password, confirmPassword } = await request.json();

  try {
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords are not same." },
        { status: 422 }
      );
    }
    await connectMongoDB();
    const users = await Users.find();

    const findUser = users.find((item: any) => item.email === email);
    if (typeof findUser !== "undefined") {
      return NextResponse.json(
        { message: "The email already exists! Try to login." },
        { status: 409 }
      );
    }

    const encryptPass = await bcrypt.hash(password, saltRounds);

    await Users.create({ name: name, email: email, password: encryptPass });

    return NextResponse.json({ message: "hey" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Oppss something went wrong on our side." },
      { status: 500 }
    );
  }
}
