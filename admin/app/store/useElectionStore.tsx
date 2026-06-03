import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";


type ElectionStore = {
    isCreatingElection: boolean;

    createElection: (data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => Promise<boolean>;
};

export const useElectionStore = create<ElectionStore>((set) => ({
    isCreatingElection: false,
    
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
    }
}))