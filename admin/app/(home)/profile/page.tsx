"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { EmptyState } from "@/components/general/EmptyState";

export default function Profile() {
  const { isGettingAdmin, profile, getMeAdmin } = useAuthStore();

  useEffect(() => {
    getMeAdmin();
  }, [getMeAdmin]);

  if (isGettingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">
            <Loader2 className="animate-spin size-6 text-primary" />
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <EmptyState
        title="No Profile Available"
        description="Go to admin to create profile"
        buttonText="Back to home"
        href="/"
      />
    );
  }

  const fullName = `${profile.firstName} ${
    profile.otherName ? profile.otherName + " " : ""
  }${profile.surname}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Row */}
          <div className="px-8 pb-8 -mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <Image
                src={profile.profilePicture || "/placeholder.png"}
                alt={fullName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-3xl font-bold text-primary">{fullName}</h1>

                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-mauve-50 border border-indigo-200 w-fit mx-auto sm:mx-0">
                  {profile.role}
                </span>
              </div>

              <p className="text-sm text-primary">
                ID:{" "}
                <span className="font-mono text-muted-foreground">
                  {profile.adminId}
                </span>
              </p>

              <p className="text-sm text-primary">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-semibold text-primary border-b pb-3">
              Personal Details
            </h3>

            <div className="space-y-5">
              <Info label="Gender:" value={profile.sex?.toLowerCase()} />
              <Info
                label="Date of Birth"
                value={new Date(profile.DOB).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
              <Info
                label="Marital Status"
                value={profile.maritalStatus?.toLowerCase()}
              />
              <Info
                label="Education Level"
                value={profile.education?.toLowerCase()}
              />
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-semibold text-primary border-b pb-3">
              Contact & Regional Information
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Residential Address
                </p>
                <div className="mt-2 p-4 bg-gray-50 rounded-xl border text-gray-800 text-sm">
                  {profile.residentialAddress}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Info label="LGA" value={profile.LGA} />
                <Info label="State" value={profile.state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENT ================= */
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-primary uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 capitalize">{value}</p>
    </div>
  );
}
