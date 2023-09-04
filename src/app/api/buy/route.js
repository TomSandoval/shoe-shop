import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";
import { checkStock } from "../utils/checkStock";

export const POST = async (request) => {
  try {
    await connect();

    const { id, sizeSelected, buyWithVariation, variation } =
      await request.json();

    const shoeBuy = await Shoe.findById(id);

    const { variations, size } = shoeBuy;

    if (buyWithVariation === true) {
      let variationFound = variations.find((v) => v.name == variation.name);

      const variationIndex = shoeBuy?.variations.findIndex(
        (v) => v.name === variation.name
      );

      const sizeIndexBuy = variationFound?.size.findIndex(
        (s) => s.size == sizeSelected
      );



      await Shoe.findByIdAndUpdate(id, {
        $set: {
          [`variations.${variationIndex}.size.${sizeIndexBuy}.stock`]:
            variations[variationIndex].size[sizeIndexBuy].stock - 1,
        },
      });
    } else {
      const sizeIndexBuy = size.findIndex((s) => s.size == sizeSelected);

      await Shoe.findByIdAndUpdate(
        id,
        {
          $set: {
            [`size.${sizeIndexBuy}.stock`]: size[sizeIndexBuy].stock - 1,
          },
        },
        { new: true }
      )
    }

    checkStock(id, buyWithVariation);

    return new NextResponse("Compra realizada", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
