import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ElectionCandidates({ electionId }: { electionId: string }) {
    return(
        <div>
        <Link href={`/election/${electionId}/candidate`} className={buttonVariants()}>
          Add Candidate
        </Link>
        </div>
    )
}