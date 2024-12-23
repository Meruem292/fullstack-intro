"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export default function PostTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch posts data
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/post");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Open Edit Dialog
  const openEditDialog = (post: Post) => {
    setCurrentPost(post);
    setIsEditDialogOpen(true);
  };

  // Open Delete Dialog
  const openDeleteDialog = (post: Post) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!currentPost) return;
    try {
      const res = await fetch(`/api/post/${currentPost.id}`, {
        method: "PUT",
        body: JSON.stringify(currentPost),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update post");

      await fetchPosts(); // Refetch posts
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!currentPost) return;
    try {
      const res = await fetch(`/api/post/${currentPost.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");

      await fetchPosts(); // Refetch posts
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your recent posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.content}</TableCell>
              <TableCell>{post.authorId}</TableCell>
              <TableCell>
                {new Date(post.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button onClick={() => openEditDialog(post)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => openDeleteDialog(post)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTitle className="sr-only">Edit Post</DialogTitle>
        <DialogContent>
          <DialogHeader>Edit Post</DialogHeader>
          <Input
            name="title"
            value={currentPost?.title || ""}
            onChange={(e) =>
              setCurrentPost((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              )
            }
          />
          <Input
            name="content"
            value={currentPost?.content || ""}
            onChange={(e) =>
              setCurrentPost((prev) =>
                prev ? { ...prev, content: e.target.value } : null
              )
            }
          />
          <DialogFooter>
            <Button onClick={handleUpdate}>Save</Button>
            <Button
              variant="secondary"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTitle className="sr-only">Delete Post</DialogTitle>
        <DialogContent>
          <DialogHeader>Confirm Deletion</DialogHeader>
          <p>Are you sure you want to delete this post?</p>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
