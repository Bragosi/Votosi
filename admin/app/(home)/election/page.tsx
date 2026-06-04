"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useElectionStore } from "@/app/store/useElectionStore";
import { EmptyState } from "@/components/general/EmptyState";
import { Loader2, Plus, Pencil, Calendar, PlusCircleIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteElection from "./_components/DeleteElection";
import { Card } from "@/components/ui/card";

export default function Election() {
  const { getElections, elections, isGettingElections } = useElectionStore();

  useEffect(() => {
    getElections();
  }, [getElections]);

  const getStatusVariant = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "default";
      case "CLOSED":
        return "destructive";
      case "DRAFT":
        return "secondary";
      default:
        return "outline";
    }
  };

  const safeElections = Array.isArray(elections) ? elections : [];

  return (
    <Card className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Elections</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage and monitor all elections.
          </p>
        </div>

        <Button asChild className="w-full sm:w-auto gap-2">
          <Link href="/election/create-election">
            <PlusCircleIcon className="size-4" />
            Create Election
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Total Elections</p>
        <h2 className="text-2xl sm:text-3xl font-bold">
          {safeElections.length}
        </h2>
      </div>

      {/* Loading */}
      {isGettingElections && (
        <div className="flex justify-center py-16 sm:py-20">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isGettingElections && safeElections.length === 0 && (
        <EmptyState
          title="No Registered Elections"
          description="No elections have been created yet."
          buttonText="Create Election"
          href="/election/create-election"
        />
      )}

      {/* Election List */}
      {!isGettingElections && safeElections.length > 0 && (
        <div className="space-y-4">
          {safeElections.map((election) => (
            <div
              key={election.id}
              className="rounded-xl border bg-card p-4 sm:p-5 transition hover:shadow-sm"
            >
              <div className="flex gap-4 items-center justify-between">
                {/* Left Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title + Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-semibold text-base sm:text-lg wrap-break-word">
                      {election.title}
                    </h3>

                    <Badge
                      className={`w-fit ${
                        election.status?.toUpperCase() === "ACTIVE"
                          ? "bg-green-600 hover:bg-green-600 text-white"
                          : ""
                      }`}
                      variant={getStatusVariant(election.status)}
                    >
                      {election.status}
                    </Badge>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="size-4 shrink-0 text-primary" />
                    <span className="wrap-break-word">
                      {new Date(election.startDate).toLocaleDateString()} →{" "}
                      {new Date(election.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Link
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                      href={`/election/${election.id}/edit`}
                    >
                      <Pencil className="size-4 text-primary" />
                    </Link>

                  <DeleteElection election={election} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
