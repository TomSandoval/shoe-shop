import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();

    const shoes = await Shoe.find();

    const shoesWithVariations = shoes.filter((s) => s.have_variations === true);
    const shoesWithoutVariations = shoes.filter(
      (s) => s.have_variations === false
    );

    const allVariations = [];

    shoesWithoutVariations.forEach((s) => {
      allVariations.push(s.color);
    });
    shoesWithVariations.forEach((s) => {
      s.variations.forEach((v) => {
        allVariations.push(v);
      });
    });

    const uniqueNames = {};

    const variations = [];

    for (let i = 0; i < allVariations.length; i++) {
      if (!uniqueNames[allVariations[i].name]) {
        const object = {
          name: allVariations[i].name,
          color: allVariations[i].color,
        };
        variations.push(object);
        uniqueNames[allVariations[i].name] = true;
      }
    }


    return new NextResponse(JSON.stringify(variations), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
