"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Show a toast message to confirm logout
    toast({
      title: "You have been logged out.",
      description: "Redirecting to login page...",
    });

    // Clear token or session data
    localStorage.removeItem("token");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Log Out
    </Button>
  );
}
