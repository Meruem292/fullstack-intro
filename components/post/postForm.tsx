"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(20, { message: "Title must be less than 20 characters." }),
  content: z
    .string()
    .min(5, { message: "Content must be at least 5 characters." })
    .max(100, { message: "Content must be less than 100 characters." }),
  authorId: z.string().min(1, { message: "Author ID is required." }),
});

export function ProfileForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      authorId: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await fetch("/api/post/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      form.reset();
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Write your content here..."
                  {...field}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Author ID Field */}
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author ID</FormLabel>
              <FormControl>
                <Input placeholder="Author ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
