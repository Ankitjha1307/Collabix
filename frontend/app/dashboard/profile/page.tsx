"use client";

import { useEffect, useState } from "react";
import { User2, Mail, AtSign, CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";

import { getProfile } from "@/services/auth.service";

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const data = await getProfile();
            setUser(data);
        } catch (err : any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const initials =
        user?.name
        ?.trim()
        .split(/\s+/)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";

    const joinedDate = user
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : "";

    if (loading) {
        return (
        <div className="mx-auto max-w-6xl space-y-6 p-6">Loading Profile...</div>
        );
    }

    return (
        <>
            {error && (
                <div className="mx-auto mb-6 w-full max-w-7xl rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
            )}

            <div className="mx-auto max-w-6xl space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Profile</h1>
                    <p className="text-muted-foreground mt-2">Manage your account and personal information.</p>
                </div>

                <Card className="rounded-3xl">
                    <CardContent className="flex flex-col items-center py-10">
                        <Avatar className="h-28 w-28 border-4 border-primary/20">
                            <AvatarFallback className="text-3xl font-bold text-accent">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <h2 className="mt-6 text-3xl font-bold text-primary">{user?.name}</h2>
                        <div className="mt-2 flex items-center gap-2">
                            <AtSign className="h-4 w-4 text-accent" />
                            {user?.username}
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4 text-accent" />
                            {user?.email}
                        </div>

                        <Badge
                            variant="secondary"
                            className="mt-5 rounded-full px-4 py-1"
                        >
                            <CalendarDays className="mr-2 h-4 w-4 text-accent" />
                            Member since {joinedDate}
                        </Badge>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-1">
                    <Card className="rounded-3xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <User2 className="h-5 w-5 text-primary" />
                                Personal Information
                            </CardTitle>

                            <CardDescription>Your basic account details.</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div>
                                <p className="text-sm text-primary">Name</p>
                                <p className="mt-1 font-medium">{user?.name}</p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm text-primary">Username</p>
                                <p className="mt-1 font-medium">{user?.username}</p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm text-primary">Email</p>
                                <p className="mt-1 font-medium break-all">{user?.email}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}