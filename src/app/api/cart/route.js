import connect from "@/Utils/db";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import Order from "@/Models/Orders";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const POST = async (request) => {
  try {
    await connect();
    const date = new Date();
    const data = await request.json();
    let productsNames = "";

    for (let i = 0; i < data.cartItems.length; i++) {
      const item = data.cartItems[i];
      if (productsNames.length > 0) {
        productsNames = `${productsNames}, ${item.product.name} x${item.total}`;
      } else {
        productsNames = `${item.product.name} x${item.total}`;
      }
    }

    const msg = {
      to: data.email,
      from: "shoe.shop.help@gmail.com",
      subject: "Thanks for your purchase!",
      text: "Shoe Shop",
      html: `<strong>Your products: ${productsNames}, were processed successfully, we will ship soon and you will be notified to this email!.</strong>`,
    };

    await sgMail.send(msg).catch((error) => console.log(error.response.body));

    const { cartItems } = data;

    const productsForOrder = [];

    cartItems.forEach((item) => {
      const productInfo = {
        sizeSelected: item.sizeSelected,
        colorSelected: item.colorSelected,
        product: item.product,
      };
      productsForOrder.push(productInfo);
    });

    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];

    const newOrder = new Order({
      userEmail: data.email,
      address: data.address,
      products: productsForOrder,
      date: `${month + 1}/${day}/${year}`,
    });

    await newOrder.save().catch((error) => {
      throw new Error(error);
    });

    cartItems.forEach(async (item) => {
      const dataProduct = {
        product: item.product,
        sizeSelected: item.sizeSelected,
        colorSelected: item.colorSelected,
      };

      for (let i = 0; i < item.total; i++) {
        await fetch("http://localhost:3000/api/buy", {
          method: "POST",
          body: JSON.stringify(dataProduct),
        });
      }
    });

    return new NextResponse("Llego", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
