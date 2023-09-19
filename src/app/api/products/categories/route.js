import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const shoes = await Shoe.find({});

    const uniqueNames = {};

    const categories = [];

    shoes.forEach((s) => {
      if (!uniqueNames[s.category]) {
        categories.push(s.category);
        uniqueNames[s.category] = true;
      }
    });

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
