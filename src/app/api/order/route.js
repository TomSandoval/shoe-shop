import connect from "@/Utils/db";
import Order from "@/Models/Orders";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const POST = async (request) => {
  try {
    await connect();

    const date = new Date();
    const data = await request.json();

    const msg = {
      to: data.email,
      from: "shoe.shop.help@gmail.com",
      subject: "Thanks for your purchase!",
      text: "Shoe Shop",
      html: `<strong>Your product: ${data.product.name}, were processed successfully, we will ship soon and you will be notified to this email!.</strong>`,
    };

    sgMail.send(msg).catch((error) => {
      throw new Error(error.body);
    });

    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];

    const dataProduct = {
      product: data.product,
      sizeSelected: data.sizeSelected,
      colorSelected: data.colorSelected,
    };

    const newOrder = new Order({
      userEmail: data.email,
      address: data.addres,
      products: [dataProduct],
      date: `${month + 1}/${day}/${year}`,
    });

    await newOrder.save().catch((error) => {
      throw new Error(error);
    });

    await fetch("http://localhost:3000/api/buy", {
      method: "POST",
      body: JSON.stringify(dataProduct),
    });

    return new NextResponse("Product procces successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
