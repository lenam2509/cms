import { create } from "zustand";
import { toast } from "react-toastify";

export type GlobalAlert = {
  message: string;
  type: "error" | "success" | "info" | "warning";
};

export interface GlobalAlertStore {
  alert: GlobalAlert | null;
  setAlert: (alert: GlobalAlert | null) => void;
}

export const useGlobalAlertStore = create<GlobalAlertStore>((set) => ({
  alert: null,
  setAlert: (alert) =>
    set(() => {
      if (alert) {
        toast[alert.type](alert.message);
      }
      return { alert };
    }),
}));
