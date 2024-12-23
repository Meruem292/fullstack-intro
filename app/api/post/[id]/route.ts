import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


// Handle PUT request to update a specific post
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const postId = params.id; // Extract ID from the route parameter
  const { title, content, authorId } = await request.json();

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}

// Handle DELETE request to delete a specific post
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const postId = params.id;

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
