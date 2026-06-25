"use client";

import { useElectionStore } from "@/app/store/useElectionStore";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 className="size-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">Fetching candidates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Candidates</h2>

        <Link
          href={`/election/${electionId}/candidate`}
          className={buttonVariants()}
        >
          <PlusCircleIcon className="mr-2 size-4" />
          Add Candidate
        </Link>
      </div>

      {safeCandidates.length === 0 ? (
        <EmptyState
          title="No Candidates Added"
          description="Add a candidate to this election."
          buttonText="Add Candidate"
          href={`/election/${electionId}/candidate`}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {safeCandidates.map((candidate: Candidate) => {
            const fullName = `${candidate.surname} ${candidate.firstName} ${
              candidate.otherName || ""
            }`.trim();

            return (
              <Card
                key={candidate.id}
                className="group overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={candidate.imageUrl || "/placeholder.png"}
                    alt={fullName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* VOTES */}
                  <div className="absolute right-3 top-3 rounded-full bg-background/95 px-3 py-1.5 shadow-md backdrop-blur">
                    <div className="flex items-center gap-1.5">
                      <Vote className="size-4 text-primary" />
                      <span className="text-sm font-semibold">
                        {candidate._count?.votes ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* DELETE */}
                  <div className="absolute left-3 top-3">
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
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* NAME */}
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                        <User className="size-3.5" />
                        Candidate Name
                      </div>

                      <p className="mt-1 text-lg font-semibold line-clamp-2">
                        {fullName}
                      </p>
                    </div>

                    {/* PARTY */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2">
                        <Flag className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Party
                        </p>

                        <p className="font-medium">
                          {typeof candidate.party === "object"
                            ? candidate.party?.name
                            : candidate.party || "Independent"}
                        </p>
                      </div>
                    </div>

                    {/* SEX */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2">
                        <Venus className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Gender
                        </p>

                        <p className="font-medium capitalize">
                          {candidate.sex}
                        </p>
                      </div>
                    </div>

                    {/* STATE */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2">
                        <MapPin className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          State of Origin
                        </p>

                        <p className="font-medium">{candidate.state}</p>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <Link
                      href={`/election/${electionId}/candidate/${candidate.id}/edit`}
                      className={buttonVariants({
                        className:
                          "w-full mt-6 flex items-center justify-center gap-2",
                      })}
                    >
                      Edit Candidate
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
