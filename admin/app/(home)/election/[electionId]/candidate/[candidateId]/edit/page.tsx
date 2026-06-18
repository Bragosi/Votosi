"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";

import { useElectionStore } from "@/app/store/useElectionStore";

/**
 * You should replace this with your real schema
 * (same as create candidate schema)
 */
const EditCandidateSchema = z.object({
  firstName: z.string().min(1),
  surname: z.string().min(1),
  otherName: z.string().optional(),
  bio: z.string().optional(),
  DOB: z.string().optional(),
  state: z.string(),
  LGA: z.string(),
  sex: z.string(),
  maritalStatus: z.string(),
  education: z.string(),
  party: z.string().optional(),
});

export default function EditCandidatePage() {
  const params = useParams();
  const router = useRouter();

  const electionId = params.electionId as string;
  const candidateId = params.candidateId as string;

  const {
    GetCandidateById,
    candidate,
    isGettingCandidate,
    isAddingCandidate,
  } = useElectionStore();

  const form = useForm<z.infer<typeof EditCandidateSchema>>({
    resolver: zodResolver(EditCandidateSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      otherName: "",
      bio: "",
      DOB: "",
      state: "",
      LGA: "",
      sex: "",
      maritalStatus: "",
      education: "",
      party: "",
    },
  });

  /**
   * Fetch candidate
   */
  useEffect(() => {
    if (candidateId) {
      GetCandidateById(candidateId);
    }
  }, [candidateId, GetCandidateById]);

  /**
   * Populate form when data arrives
   */
  useEffect(() => {
    if (candidate) {
      form.reset({
        firstName: candidate.firstName ?? "",
        surname: candidate.surname ?? "",
        otherName: candidate.otherName ?? "",
        bio: candidate.bio ?? "",
        DOB: candidate.DOB
          ? new Date(candidate.DOB).toISOString().split("T")[0]
          : "",
        state: candidate.state ?? "",
        LGA: candidate.LGA ?? "",
        sex: candidate.sex ?? "",
        maritalStatus: candidate.maritalStatus ?? "",
        education: candidate.education ?? "",
        party:
          typeof candidate.party === "object"
            ? candidate.party?.name ?? ""
            : candidate.party ?? "",
      });
    }
  }, [candidate, form]);

  /**
   * Submit handler (replace with real update API)
   */
  const onSubmit = async (values: z.infer<typeof EditCandidateSchema>) => {
    try {
      console.log("UPDATE PAYLOAD:", values);

      // TODO:
      // await updateCandidate(candidateId, values)

      router.push(`/election/${electionId}`);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  return (
    <div className="w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Candidate</CardTitle>
          <CardDescription>
            Update candidate details. Existing values are loaded from the database.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isGettingCandidate ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* FIRST NAME */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SURNAME */}
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter surname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* OTHER NAME */}
                <FormField
                  control={form.control}
                  name="otherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* BIO */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <RichTextEditor field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DOB */}
                <FormField
                  control={form.control}
                  name="DOB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* STATE */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LGA */}
                <FormField
                  control={form.control}
                  name="LGA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LGA</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SEX */}
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sex</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* MARITAL STATUS */}
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* EDUCATION */}
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PARTY */}
                <FormField
                  control={form.control}
                  name="party"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SUBMIT */}
                <Button type="submit" className="w-full">
                  {isAddingCandidate ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Updating Candidate...
                    </div>
                  ) : (
                    "Update Candidate"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}