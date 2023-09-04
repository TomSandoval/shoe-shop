import User from "@/Models/User";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const users = await User.find({}, {password: 0});

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
