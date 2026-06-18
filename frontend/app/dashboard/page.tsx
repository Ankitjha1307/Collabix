"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/auth.service";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    router.push("/login");
    return;
  }

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      console.log("PROFILE:", data);

      setProfile(data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  };

  fetchProfile();
}, [router]);

  const handleLogout = async () => {
  try {
    await logout();

    localStorage.removeItem("accessToken");

    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      {profile && (
        <div className="mt-4">
          <p>Welcome {profile.name}</p>
          <p>@{profile.username}</p>
        </div>
      )}
      <Button onClick={handleLogout} variant="destructive" className="mt-4">
        Logout
      </Button>
    </div>
  );
}