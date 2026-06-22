/**
 * Global auth state management using Zustand.
 * Manages voter session, biometric verification status,
 * and loading/error states.
 */
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { authService, VoterData, LoginPayload, ActivatePayload } from '@/services/authService';
import { TOKEN_KEY } from '@/services/apiClient';

interface AuthState {
  // Session
  voter: VoterData | null;
  isAuthenticated: boolean;
  isBiometricVerified: boolean;

  // Loading states
  isLoading: boolean;
  isInitializing: boolean;

  // Error
  error: string | null;

  // Actions
  login: (payload: LoginPayload) => Promise<boolean>;
  activate: (payload: ActivatePayload) => Promise<boolean>;
  logout: () => Promise<void>;
  setBiometricVerified: (verified: boolean) => void;
  clearError: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  voter: null,
  isAuthenticated: false,
  isBiometricVerified: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  initialize: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const voterJson = await SecureStore.getItemAsync('votosi_voter');
      if (token && voterJson) {
        const voter = JSON.parse(voterJson) as VoterData;
        set({
          voter,
          isAuthenticated: true,
          isBiometricVerified: false, // Always require biometric on app launch
          isInitializing: false,
        });
      } else {
        set({ isInitializing: false });
      }
    } catch {
      set({ isInitializing: false });
    }
  },

  login: async (payload: LoginPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(payload);
      if (response.data) {
        await SecureStore.setItemAsync('votosi_voter', JSON.stringify(response.data));
        set({
          voter: response.data,
          isAuthenticated: true,
          isBiometricVerified: false,
          isLoading: false,
        });
        return true;
      }
      set({ isLoading: false, error: response.message });
      return false;
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Network error. Please check your connection.';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  activate: async (payload: ActivatePayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.activate(payload);
      if (response.data) {
        await SecureStore.setItemAsync('votosi_voter', JSON.stringify(response.data));
        set({
          voter: response.data,
          isAuthenticated: true,
          isBiometricVerified: false,
          isLoading: false,
        });
        return true;
      }
      set({ isLoading: false, error: response.message });
      return false;
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Network error. Please check your connection.';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Logout even if server call fails
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync('votosi_voter');
    set({
      voter: null,
      isAuthenticated: false,
      isBiometricVerified: false,
      isLoading: false,
      error: null,
    });
  },

  setBiometricVerified: (verified: boolean) => {
    set({ isBiometricVerified: verified });
  },

  clearError: () => {
    set({ error: null });
  },
}));
