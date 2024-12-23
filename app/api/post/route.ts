'use server'
// app/api/post/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body (JSON)
    const { title, content, authorId } = await request.json();

    // Check if all fields are present
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert the post into the database
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Post created successfully", data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma Client after request
    await prisma.$disconnect();
  }
}
export async function GET() {
  try {
    // Fetch posts from the database
    const posts = await prisma.post.findMany();

    // Return the posts as JSON
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


