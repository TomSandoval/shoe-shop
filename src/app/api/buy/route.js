import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";
import { checkStock } from "../utils/checkStock";

export const POST = async (request) => {
  try {
    await connect();

    const { product, sizeSelected, colorSelected } = await request.json();



    const shoeBuy = await Shoe.findById(product._id);

    const { variations, size } = shoeBuy;

    if (shoeBuy.have_variations === true) {
      let variationFound = variations.find((v) => v.name == colorSelected);

      const variationIndex = shoeBuy?.variations.findIndex(
        (v) => v.name === colorSelected
      );

      const sizeIndexBuy = variationFound?.size.findIndex(
        (s) => s.size == sizeSelected
      );

      await Shoe.findByIdAndUpdate(product._id, {
        $set: {
          [`variations.${variationIndex}.size.${sizeIndexBuy}.stock`]:
            variations[variationIndex].size[sizeIndexBuy].stock - 1,
        },
      });
    } else {
      const sizeIndexBuy = size.findIndex((s) => s.size == sizeSelected);

      await Shoe.findByIdAndUpdate(
        product._id,
        {
          $set: {
            [`size.${sizeIndexBuy}.stock`]: size[sizeIndexBuy].stock - 1,
          },
        },
        { new: true }
      );
    }

    checkStock(product._id, product.have_variations);

    return new NextResponse("Compra realizada", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
