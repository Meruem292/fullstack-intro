
import { SignupForm } from "@/components/forms/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>Sign up here</CardHeader>
        <CardContent>
          <SignupForm/>
        </CardContent>
        <CardFooter>
          <Link href="/">Already have an account? </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
