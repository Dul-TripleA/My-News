import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const categoryName = params.categoryName;

    const category = await prisma.category.findUnique({
      where: { categoryName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
