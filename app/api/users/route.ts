import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const users = await Users.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Opps! error" }, { status: 500 });
  }
}
