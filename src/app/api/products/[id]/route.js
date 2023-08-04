import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connect();

    const { id } = params;

    const shoe = await Shoe.findById(id);

    return new NextResponse(shoe, { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connect();

    const { id } = params;

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

    await Shoe.findByIdAndUpdate(id, {
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

    return new NextResponse("Product Updated!", {status: 200})

  } catch (error) {
    return new NextResponse(error, {status: 500})
  }
};
