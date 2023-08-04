import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const {
      name,
      brand,
      gender,
      category,
      description,
      in_stock,
      stock,
      images,
      in_discount,
      original_price,
      discount_price,
      have_variations,
      variations,
      size,
      features,
      material,
      color,
      background_card,
    } = await request.json();

    await Shoe.create({
      name,
      brand,
      gender,
      category,
      description,
      in_stock,
      stock,
      images,
      in_discount,
      original_price,
      discount_price,
      have_variations,
      variations,
      size,
      features,
      material,
      color,
      background_card,
    });

    return new NextResponse("Product create!", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const GET = async (request) => {
  
  try {

    const page = request.nextUrl.searchParams.get("page") || 1;

    

    await connect();

    const shoes = await Shoe.paginate({},{page:page, limit: 9});

    return new NextResponse(JSON.stringify(shoes), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
  
};
