"use client";

import CreatePost from "@/components/ui/createPost";

export default function Home() {
  return (
    <main className="align-center justify-center flex flex-col h-screen space-y-4">
      <h1>Welcome to my site</h1>
      <CreatePost />
    </main>
  );
}
