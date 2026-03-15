import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChildProfile {
  id: string;
  name: string;
  current_level: number;
  total_xp: number;
  avatar_url?: string;
  neurodivergent_mode: boolean;
}

interface ChildState {
  selectedChild: ChildProfile | null;
  setSelectedChild: (child: ChildProfile | null) => void;
  addXP: (amount: number) => void;
  updateStats: (updates: Partial<ChildProfile>) => void;
}

export const useChildStore = create<ChildState>()(
  persist(
    (set) => ({
      selectedChild: null,
      setSelectedChild: (child) => set({ selectedChild: child }),
      addXP: (amount) =>
        set((state) => ({
          selectedChild: state.selectedChild
            ? { ...state.selectedChild, total_xp: state.selectedChild.total_xp + amount }
            : null,
        })),
      updateStats: (updates) =>
        set((state) => ({
          selectedChild: state.selectedChild
            ? { ...state.selectedChild, ...updates }
            : null,
        })),
    }),
    {
      name: "child-storage",
    }
  )
);
