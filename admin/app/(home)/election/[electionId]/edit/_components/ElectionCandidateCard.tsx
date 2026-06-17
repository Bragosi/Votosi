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
  Loader2,
  Flag,
  Venus,
  MapPin,
  ArrowRight,
} from "lucide-react";
import DeleteCandidate from "./DeleteCandidate";
import { EmptyState } from "@/components/general/EmptyState";

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
      <div className="flex flex-col items-center justify-center text-center">
        <Loader2 className="animate-spin tex-4 text-primary" />
        fetching candidates...
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
        <EmptyState
          title="No Candidate have been added"
          description="Add a candidate to elelction"
          buttonText="Add Candidate"
          href={`/election/${electionId}/candidate`}
        />
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
                {/* IMAGE (exact lecturer style) */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={candidate.imageUrl || "/placeholder.png"}
                    alt={fullName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* VOTE BADGE */}
                  <div className="absolute bottom-2 right-2 text-primary text-lg px-2 py-1 rounded-md flex items-center gap-1">
                    <Vote className="size-6" />
                    {candidate._count?.votes ?? 0}
                  </div>
                  <div className="absolute bottom-2 left-2 text-primary text-lg px-2 py-1 rounded-md flex items-center gap-1">
                    <DeleteCandidate
                      candidate={{
                        id: candidate.id,
                        firstName: candidate.firstName,
                        surname: candidate.surname,
                        party:
                          typeof candidate.party === "object"
                            ? candidate.party?.name || "Independent"
                            : candidate.party || "Independent",
                      }}
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <CardContent className="p-4">
                  {/* NAME */}
                  <div className="flex items-center gap-1 font-semibold text-lg line-clamp-1 hover:text-primary transition-colors text-muted-foreground">
                    <User className="size-4 text-primary" /> Name:{" "}
                    <span className="text-primary">{fullName}</span>
                  </div>

                  {/* PARTY */}
                  <div className="flex items-center mt-2 gap-1 text-lg font-semibold  text-muted-foreground line-clamp-1">
                    <Flag className="size-4 text-primary" />
                    Party:{" "}
                    <span className="text-primary">
                      {typeof candidate.party === "object"
                        ? candidate.party?.name
                        : candidate.party || "Independent"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-lg  text-muted-foreground font-semibold">
                    <Venus className="text-primary size-4" />
                    Sex:
                    <span className="text-lg text-primary capitalize">
                      {candidate.sex}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-muted-foreground font-semibold text-lg">
                    <MapPin className="text-primary size-4" />
                    State of origin :
                    <span className="text-primary">{candidate.state}</span>
                  </div>

                  <Link
                    href={`/election/${electionId}/candidate/${candidate.id}/edit`}
                    className={buttonVariants({
                      className: "w-full mt-4 items-center justify-center",
                    })}
                  >
                    Edit Candidate <ArrowRight className="size-4"/>
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
