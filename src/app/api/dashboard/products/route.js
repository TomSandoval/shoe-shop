import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";


export const GET = async (request) => {

    try {
        await connect();

        const shoes = await Shoe.find({});


        return new NextResponse(JSON.stringify(shoes), {status: 200})

    } catch (error) {
        return new NextResponse(error, {status: 500});
    }
}