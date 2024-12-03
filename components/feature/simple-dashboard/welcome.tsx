"use client";
import { signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
      </header>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Thank you for logging in. This is your simple dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="destructive" onClick={() => signOut({ redirectTo: "/sign-in" })}
            >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
