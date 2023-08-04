import User from "@/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/Utils/db";

export const POST = async (request) => {
  const { username, email, password, repeatPassword } = await request.json();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  try {
  await connect();

  const user = await User.find({ email: email });

  if (user.length) {
    throw new Error("There is already an account registered with this email");
  }

  if (emailRegex.test(email) === false || password !== repeatPassword) {
    throw new Error(
      "An error occurred while registering the user, check the data entered"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = new User({
    name: username,
    email,
    password: hashedPassword,
  });

    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
