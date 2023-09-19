import Order from "@/Models/Orders";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const orders = await Order.find({});

    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
