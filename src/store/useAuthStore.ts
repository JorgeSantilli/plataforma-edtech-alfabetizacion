import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  id: string;
  full_name: string;
  role: "padre" | "docente" | "admin";
}

interface AuthState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      logout: () => set({ profile: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
