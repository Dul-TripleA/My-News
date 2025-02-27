const { NextResponse } = require("next/server");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {

    try{
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, { status: 200 });
    }catch (error) {
        console.log(error);
        return NextResponse.json("Something Worng", { status: 500 });

    }
}
