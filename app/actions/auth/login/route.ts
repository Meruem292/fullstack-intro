"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

export async function Login(email: string, password: string) {
  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return {
        status: 400,
        message: "Email and password are required.",
      };
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        status: 404,
        message: "User not found.",
      };
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid email or password.",
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {
      status: 200,
      message: "Login successful.",
      token,
    };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return {
      status: 500,
      message: "An internal server error occurred.",
      error: error.message,
    };
  }
}
