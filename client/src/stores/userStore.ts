import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  name: string;
  email: string;
  id: string;
  isAdmin: boolean;
};

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
