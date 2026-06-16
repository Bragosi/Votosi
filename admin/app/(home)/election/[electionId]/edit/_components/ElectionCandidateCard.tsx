"use client";

import { useElectionStore } from "@/app/store/useElectionStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  PlusCircleIcon,
  Vote,
  User,
} from "lucide-react";

interface Candidate {
  id: string;
  firstName: string;
  surname: string;
  otherName?: string | null;
  party?: string | { name: string } | null;
  electionId: string;
  state: string;
  imageUrl?: string | null;
  sex: string;
  _count: { votes: number };
}

interface Props {
  electionId: string;
}

export default function ElectionCandidateCard({ electionId }: Props) {
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

  if (isGettingCandidatesInElection) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading candidates...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER (same pattern as lecturer cards page header) */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Candidates</h2>

        <Link
          href={`/election/${electionId}/candidate`}
          className={buttonVariants()}
        >
          <PlusCircleIcon className="size-4 mr-2" />
          Add Candidate
        </Link>
      </div>

      {/* EMPTY STATE */}
      {safeCandidates.length === 0 ? (
        <div className="p-6 text-center border rounded-lg text-muted-foreground">
          No candidates found.
        </div>
      ) : (
        /* GRID (same spacing philosophy as lecturer cards grid) */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {safeCandidates.map((candidate: Candidate) => {
            const fullName = `${candidate.surname} ${candidate.firstName} ${
              candidate.otherName || ""
            }`.trim();

            return (
              <Card
                key={candidate.id}
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-muted py-0 gap-0"
              >
                {/* TOP RIGHT ACTIONS (same pattern as lecturer card dropdown zone) */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="flex gap-1">
                    <Link
                      href={`/dashboard/elections/${electionId}/candidates/${candidate.id}/edit`}
                      className="p-2 rounded-md bg-white/80 hover:bg-white transition"
                    >
                      <Pencil className="size-4" />
                    </Link>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/80 hover:bg-white"
                      onClick={() => console.log("Delete:", candidate.id)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {/* IMAGE (exact lecturer style) */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={candidate.imageUrl || "/placeholder.png"}
                    alt={fullName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* VOTE BADGE */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Vote className="size-3" />
                    {candidate._count?.votes ?? 0}
                  </div>
                </div>

                {/* CONTENT */}
                <CardContent className="p-4">
                  {/* NAME */}
                  <div className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
                    {fullName}
                  </div>

                  {/* PARTY */}
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {typeof candidate.party === "object"
                      ? candidate.party?.name
                      : candidate.party || "Independent"}
                  </div>

                  {/* META (same lecturer card structure vibe) */}
                  <div className="flex flex-col gap-2 pt-3">
                    <div className="flex items-center gap-2">
                      <User className="size-8 p-1.5 rounded-md text-primary bg-primary/10" />
                      <span className="text-sm text-muted-foreground capitalize">
                        {candidate.sex}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Vote className="size-8 p-1.5 rounded-md text-primary bg-primary/10" />
                      <span className="text-sm text-muted-foreground">
                        {candidate.state}
                      </span>
                    </div>
                  </div>

                  {/* CTA (same full-width button pattern) */}
                  <Link
                    href={`/dashboard/elections/${electionId}/candidates/${candidate.id}/edit`}
                    className={buttonVariants({
                      className: "w-full mt-4",
                    })}
                  >
                    Edit Candidate
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}