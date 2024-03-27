import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imgUrl, publicId } =
    await req.json();

  const authorEmail = session?.user?.email;

  if (!title || !content) {
    return NextResponse.json({ message: "Missing fields" }, { status: 500 });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        imgUrl,
        publicId,
        categoryName: selectedCategory,
        authorEmail: authorEmail,
      },
    });
    console.log("post created", newPost);

    return NextResponse.json(newPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
