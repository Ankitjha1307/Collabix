"use client";
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
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function CardDemo() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      const response = await login({
        email: isEmail ? identifier : undefined,
        username: isEmail ? undefined : identifier,
        password,
      });

      localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );

    router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "Invalid Credentials. Please try again."
      );
    }finally{
        setIsLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">

      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-1/3 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

      <div className="absolute left-6 top-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <Card className="relative z-10 w-full max-w-md rounded-3xl border shadow-2xl">
        <CardHeader className="space-y-3 text-center p-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/brand/Logo.svg"
                alt="Collabix"
                width={42}
                height={42}
              />
              <h1 className="text-3xl font-bold tracking-tight">
                Collabix
              </h1>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              Collaborate on projects with a workspace built for modern teams.
            </p>
          </div>
          <CardTitle className="text-2xl">Sign in to your account!</CardTitle>
          <CardDescription>
            Get back to organizing your workspaces and projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-5">
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-5"
                  />

                  <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                {isLoading? "Signing in..." : "Sign in"}
              </Button>
              <CardAction className="w-full">
                <p className="text-center text-sm text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <Link
                          href="/register"
                          className="font-medium text-primary hover:underline"
                      >
                        Sign up
                      </Link>
                  </p>
              </CardAction>
            </CardFooter>
          </form>
        </CardContent> 
      </Card>
    </div>
  )
}
