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
    await connect();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const queryCategory = request.nextUrl.searchParams.get("category");
    const queryColor = request.nextUrl.searchParams.get("color");
    const queryMinPrice = parseInt(request.nextUrl.searchParams.get("min"));
    const queryMaxPrice = parseInt(request.nextUrl.searchParams.get("max"));
    const queryOrder = request.nextUrl.searchParams.get("order");
    const querySearch = request.nextUrl.searchParams.get("search");

    if (querySearch) {
      const regex = new RegExp(querySearch, "i");

      const shoesMatch = await Shoe.paginate(
        { name: regex },
        { page: page, limit: 9 }
      );
      return new NextResponse(JSON.stringify(shoesMatch), { status: 200 });
    }

    if (queryOrder) {
      if (queryOrder === "min-max") {
        const perPage = 9;
        const discountedProducts = await Shoe.paginate(
          {
            in_discount: true,
            discount_price: { $ne: null },
          },
          {
            page: page,
            limit: perPage,
            sort: { discount_price: 1 },
          }
        );

        const regularProducts = await Shoe.paginate(
          {
            in_discount: null,
          },
          {
            page: page,
            limit: perPage,
            sort: { price: 1 },
          }
        );

        const combinedResults = {
          docs: [...discountedProducts.docs, ...regularProducts.docs],
          totalDocs: discountedProducts.totalDocs + regularProducts.totalDocs,
          limit: perPage,
          page: page,
          totalPages: Math.ceil(
            (discountedProducts.totalDocs + regularProducts.totalDocs) / perPage
          ),
          hasPrevPage: page > 1,
          hasNextPage:
            page <
            Math.ceil(
              (discountedProducts.totalDocs + regularProducts.totalDocs) /
                perPage
            ),
        };

        return new NextResponse(JSON.stringify(combinedResults), {
          status: 200,
        });
      } else {
        const perPage = 9;
        const discountedProducts = await Shoe.paginate(
          {
            in_discount: true,
            discount_price: { $ne: null },
          },
          {
            page: page,
            limit: perPage,
            sort: { discount_price: -1 },
          }
        );

        const regularProducts = await Shoe.paginate(
          {
            in_discount: null,
          },
          {
            page: page,
            limit: perPage,
            sort: { price: -1 },
          }
        );

        const combinedResults = {
          docs: [...regularProducts.docs, ...discountedProducts.docs],
          totalDocs: discountedProducts.totalDocs + regularProducts.totalDocs,
          limit: perPage,
          page: page,
          totalPages: Math.ceil(
            (discountedProducts.totalDocs + regularProducts.totalDocs) / perPage
          ),
          hasPrevPage: page > 1,
          hasNextPage:
            page <
            Math.ceil(
              (discountedProducts.totalDocs + regularProducts.totalDocs) /
                perPage
            ),
        };

        return new NextResponse(JSON.stringify(combinedResults), {
          status: 200,
        });
      }
    }

    if (queryMaxPrice || queryMinPrice) {
      const shoesPrice = await Shoe.paginate(
        {
          $or: [
            {
              $and: [
                { in_discount: true }, // Producto en descuento
                {
                  discount_price: { $gte: queryMinPrice, $lte: queryMaxPrice },
                }, // Precio de descuento dentro del rango
              ],
            },
            {
              $and: [
                { in_discount: false }, // Producto no está en descuento
                { price: { $gte: queryMinPrice, $lte: queryMaxPrice } }, // Precio dentro del rango
              ],
            },
          ],
        },
        { page: page, limit: 9 }
      );

      return new NextResponse(JSON.stringify(shoesPrice), { status: 200 });
    }

    if (queryCategory) {
      const shoesCategory = await Shoe.paginate(
        { category: queryCategory },
        { page: page, limit: 9 }
      );

      return new NextResponse(JSON.stringify(shoesCategory, { status: 200 }));
    } else if (queryColor) {
      const shoesColor = await Shoe.paginate(
        {
          $or: [
            { "color.name": queryColor },
            { "variations.name": queryColor },
          ],
        },
        { page: page, limit: 9 }
      );

      return new NextResponse(JSON.stringify(shoesColor), { status: 200 });
    }

    const shoes = await Shoe.paginate({}, { page: page === "null" ? 1 : page, limit: 9 });

    return new NextResponse(JSON.stringify(shoes), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

