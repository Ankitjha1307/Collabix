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
import { register } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function CardDemo() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      setError("");
  
      try {
        const response = await register({
          name,
          username,
          email,
          password,
        });

        console.log("REGISTER RESPONSE:", response);

        router.push("/login");
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
          "Registration failed. Please try again."
        );
      }
    };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register for a Collabix account</CardTitle>
          <CardDescription>
            Enter your details below to create an account
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
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                  <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-200 hover:bg-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
                </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Register
              </Button>
              <CardAction className="w-full">
                    <Link href="/login" className="w-full">
                      <Button variant="link">Already have an account? Login!</Button>
                    </Link>
                  </CardAction>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
