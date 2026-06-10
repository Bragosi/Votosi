import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";


type ElectionStore = {
  isCreatingElection: boolean;
  isGettingElections: boolean;

  createElection: (data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => Promise<boolean>;

  getElections: () => Promise<any[]>;
  elections: any[];

  DeleteElection: (electionId: string) => Promise<boolean>;
  isDeletingElection: boolean;

  EditElection: (
    electionId: string,
    data: {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      status: string;
    },
  ) => Promise<boolean>;

  isEditingElection: boolean;

  AddCandidate: (electionId: string, formData: FormData ) => Promise<boolean>;

  isAddingCandidate: boolean;
};

export const useElectionStore = create<ElectionStore>((set) => ({
  isCreatingElection: false,
  isGettingElections: false,
  elections: [],
  isDeletingElection: false,
  isEditingElection: false,
  isAddingCandidate: false,

  createElection: async (data) => {
    try {
      set({ isCreatingElection: true });
      const res = await axiosInstance.post("/election/createElection", data);
      toast.success(res.data?.message || "Election created successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create election");
      return false;
    } finally {
      set({ isCreatingElection: false });
    }
  },

  getElections: async () => {
    set({ isGettingElections: true });
    try {
      const res = await axiosInstance.get("/election/getAllElections");
      const elections = res.data?.data ?? [];
      set({ elections });
      return elections;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to get elections");
      return [];
    } finally {
      set({ isGettingElections: false });
    }
  },

  DeleteElection: async (electionId: string) => {
    set({ isDeletingElection: true });
    try {
      await axiosInstance.delete(`/election/deleteElection/${electionId}`);

      set((state) => ({
        elections: state.elections.filter(
          (election) => election.id !== electionId,
        ),
      }));

      toast.success("Election deleted successfully");

      return true;
    } catch (error: any) {
      console.log("Error deleting Election", error);

      toast.error(error.response?.data?.message || "Failed to delete Election");

      return false;
    } finally {
      set({ isDeletingElection: false });
    }
  },

  EditElection: async (electionId: string, data) => {
    try {
      set({ isEditingElection: true });

      const res = await axiosInstance.put(
        `/election/editElection/${electionId}`,
        data,
      );

      toast.success(res.data?.message || "Election updated successfully");

      set((state) => ({
        elections: state.elections.map((election) =>
          election.id === electionId
            ? { ...election, ...res.data.data }
            : election,
        ),
      }));

      return true;
    } catch (error: any) {
      console.log("Error editing election", error);

      toast.error(error.response?.data?.message || "Failed to update election");

      return false;
    } finally {
      set({ isEditingElection: false });
    }
  },

  AddCandidate: async (electionId, formData : FormData) => {
    try {
      set({ isAddingCandidate: true });

      const res = await axiosInstance.post(
        `/election/createCandidate/${electionId}/candidate`,
        formData,
      );

      toast.success(res.data?.message || "Candidate added successfully");

      return true;
    } catch (error: any) {
      console.log("Error adding candidate", error);

      toast.error(error.response?.data?.message || "Failed to add candidate");

      return false;
    } finally {
      set({ isAddingCandidate: false });
    }
  },
}));
