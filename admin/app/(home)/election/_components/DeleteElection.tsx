"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useElectionStore } from "@/app/store/useElectionStore";

type Election = {
  id: string;
  title: string;
  endDate: string;
};

export default function DeleteElection({ election }: { election: Election }) {
  const { DeleteElection, isDeletingElection } = useElectionStore();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const success = await DeleteElection(election.id);

    if (success) {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Election?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently remove{" "}
            <span className="font-medium text-primary">{election.title}</span>{" "}
            from the system. And this election is scheduled to end on{" "}
            <span className="font-medium">
              {new Date(election.endDate).toLocaleString()}
            </span>{" "}
            (ID: <span className="font-medium">{election.id}</span>) from the
            system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeletingElection}>
            Cancel
          </AlertDialogCancel>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeletingElection}
          >
            {isDeletingElection ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin size-4" />
                Deleting...
              </div>
            ) : (
              "Delete Election"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
