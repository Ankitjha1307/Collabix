"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/auth.service";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log("PROFILE:", data);

        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

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
    </div>
  );
}