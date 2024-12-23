"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoginValidation from "@/functions/validation/admin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Login } from "@/app/actions/auth/login/route";



export function LoginForm() {
  const form = useForm<z.infer<typeof LoginValidation>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginValidation),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await Login(data.email, data.password);

      if (response.status === 200) {
        console.log("Login successful:", response.message);
        if (response.token) {
          localStorage.setItem("token", response.token); // Store token if needed
        } else {
          console.error("Token is undefined");
        }
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        console.error("Login failed:", response.message);
        alert(response.message); // Show error to the user
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Log in</Button>
      </form>
    </Form>
  );
}
