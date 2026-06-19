"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/auth.service";
import { useRouter } from "next/navigation";

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


  return (
    <div>

      {profile && (
        <div className="mt-4">
          <p>Welcome {profile.name}</p>
          <p>@{profile.username}</p>
        </div>
      )}
    </div>
  );
}