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
};

export const useElectionStore = create<ElectionStore>((set) => ({
  isCreatingElection: false,
  isGettingElections: false,
  elections: [],
  isDeletingElection: false,

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
        elections: state.elections.filter((election) => election.id !== electionId),
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
}));


