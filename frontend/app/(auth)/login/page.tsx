"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/services/auth.service";
import Link from "next/link";

export default function CardDemo() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    try {
      const isEmail = identifier.includes("@");

      const response = await login({
        email: isEmail ? identifier : undefined,
        username: isEmail ? undefined : identifier,
        password,
      });

      console.log("LOGIN RESPONSE:", response);

      localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );

    console.log(
      "Stored Token:",
      localStorage.getItem("accessToken")
    );

    router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "Invalid Credentials. Please try again."
      );
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your Collabix account</CardTitle>
          <CardDescription>
            Enter your email/username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500">
                {error}
              </p>
            )}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="identifier">Email/Username</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="email or Username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <CardAction className="w-full">
                <Link href="/register" className="w-full">
                  <Button variant="link">Don't have an account? Sign up!</Button>
                </Link>
              </CardAction>
            </CardFooter>
          </form>
        </CardContent> 
      </Card>
    </div>
  )
}
