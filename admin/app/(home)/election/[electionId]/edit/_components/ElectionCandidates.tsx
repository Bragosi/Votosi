"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2, Pencil, PlusCircleIcon, Trash2 } from "lucide-react";

import { useElectionStore } from "@/app/store/useElectionStore";
import { EmptyState } from "@/components/general/EmptyState";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DeleteCandidate from "./DeleteCandidate";

interface ElectionCandidatesProps {
  electionId: string;
}

export default function ElectionCandidates({
  electionId,
}: ElectionCandidatesProps) {
  const {
    CandidatesInElection,
    isGettingCandidatesInElection,
    GetCandidatesInElections,
  } = useElectionStore();

  const safeCandidates = Array.isArray(CandidatesInElection)
    ? CandidatesInElection
    : [];

  useEffect(() => {
    GetCandidatesInElections(electionId);
  }, [electionId, GetCandidatesInElections]);

  return (
    <Card className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Election Candidates
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage and monitor all election candidates.
          </p>
        </div>

        <Button asChild className="w-full sm:w-auto">
          <Link
            href={`/election/${electionId}/candidate`}
            className="flex items-center gap-2"
          >
            <PlusCircleIcon className="size-4" />
            Add Candidate
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Total Candidates</p>
        <h2 className="text-3xl font-bold">{safeCandidates.length}</h2>
      </div>

      {/* Loading */}
      {isGettingCandidatesInElection ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : safeCandidates.length === 0 ? (
        <EmptyState
          title="No Registered Candidates"
          description="No candidates have been added to this election."
          buttonText="Add Candidate"
          href={`/election/${electionId}/candidate`}
        />
      ) : (
        <>
          {/* Table Header */}
          <div className="flex border-b pb-2 text-sm font-medium text-muted-foreground">
            <div className="w-1/3 text-primary">Name</div>
            <div className="w-1/3 text-center text-primary">Party</div>
            <div className="w-1/3 text-right text-primary">Actions</div>
          </div>

          {/* Candidate Rows */}
          <div className="space-y-2">
            {safeCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center border-b py-3 text-sm"
              >
                <div className="w-1/3 truncate">
                  {candidate.firstName} {candidate.surname}
                </div>

                <div className="w-1/3 text-center font-medium">
                  {candidate.party}
                </div>

                <div className="w-1/3 text-right">
                  <Link
                    className={buttonVariants({ variant: "outline" })}
                    href={`/election/${electionId}/candidate/${candidate.id}/edit`}
                  >
                    <Pencil />
                  </Link>
                  <DeleteCandidate candidate={candidate} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
