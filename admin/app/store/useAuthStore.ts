import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

type AuthUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

type AuthStore = {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isRegisteringOfficer: boolean;
  isRegisteringVoter: boolean;
  isGettingOfficers: boolean;

  adminSignUp: (data: { email: string; password: string }) => Promise<boolean>;

  logout: () => Promise<void>;

  checkAuth: () => Promise<boolean>;

  registerOfficer: (formData: FormData) => Promise<boolean>;
  registerVoter: (formData: FormData) => Promise<boolean>;
  officers: any[];
getRegisteredOfficers: () => Promise<any[]>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isRegisteringOfficer: false,
  isRegisteringVoter: false,
  isGettingOfficers: false,
  officers: [],

  adminSignUp: async (data) => {
    try {
      set({ isSigningUp: true });

      const res = await axiosInstance.post("/admin/signup", data);

      set({ authUser: res.data.user ?? res.data });

      toast.success("Account created successfully");
      return true;
    } catch (error: any) {
      console.log("Error in adminSignUp", error);

      set({ authUser: null });

      toast.error(error.response?.data?.message || "Signup failed");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/admin/logout");

      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/admin/check");

      set({ authUser: res.data.user ?? res.data });
      return true;
    } catch (error) {
      set({ authUser: null });
      return false;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  registerOfficer: async (formData: FormData) => {
    try {
      set({ isRegisteringOfficer: true });

      const res = await axiosInstance.post("/admin/registerOfficer", formData);

      toast.success(res.data?.message || "Officer registered successfully");

      return true;
    } catch (error: any) {
      console.log("Error registering officer", error);

      toast.error(
        error.response?.data?.message || "Failed to register officer",
      );

      return false;
    } finally {
      set({ isRegisteringOfficer: false });
    }
  },

  registerVoter: async (formData: FormData) => {
    try {
      set({ isRegisteringVoter: true });

      const res = await axiosInstance.post("/admin/registerVoter", formData);

      toast.success(res.data?.message || "Officer registered successfully");

      return true;
    } catch (error: any) {
      console.log("Error registering officer", error);

      toast.error(
        error.response?.data?.message || "Failed to register officer",
      );

      return false;
    } finally {
      set({ isRegisteringVoter: false });
    }
  },

  getRegisteredOfficers: async () => {
    set({ isGettingOfficers: true });
    try {
      const res = await axiosInstance.get("/admin/getRegisteredOfficers");
      const officers = res.data?.data ?? [];
      set({ officers });
      return officers;
    } catch (error: any) {
      console.log("Error getting officer", error);

      toast.error(
        error.response?.data?.message || "Failed to Get registered officer",
      );

      return [];
    } finally {
      set({ isGettingOfficers: false });
    }
  },
}));
