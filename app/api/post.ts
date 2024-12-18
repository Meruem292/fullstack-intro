import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/db"; // Import your Prisma instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body; // Extract data from the request body

      // Create a new post in the database
      const post = await prisma.post.create({
        data: {
          title: name, // Example: Use 'name' as the post title
          content: email, // Example: Use 'email' as the post content
          author: {
            connect: { email: email } // Assuming you want to connect an existing user by email
          }
        },
      });

      res.status(201).json(post); // Return the created post
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
