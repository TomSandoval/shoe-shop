import GoogleUser from "@/Models/GoogleUser";
import User from "@/Models/User";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const usersLocal = await User.find({}, {password: 0});
    const usersGoogle = await GoogleUser.find({});


    const users = [...usersLocal, ...usersGoogle]

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
