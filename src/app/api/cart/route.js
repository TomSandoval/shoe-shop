import Shoe from "@/Models/Product";
import connect from "@/Utils/db";
import { NextResponse } from "next/server";



export const POST = async(request)=> {


    try {
        await connect();
        const cartList = await request.json();

        cartList.forEach(async(product) => {
           await fetch("http://localhost:3000/api/buy",{
            method: "POST",
            body: JSON.stringify(product)
           })
        })

        return new NextResponse("Llego", {status:200})
    } catch (error) {
        return new NextResponse(error, {status:500})
    }

}