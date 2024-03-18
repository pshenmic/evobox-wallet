import {create} from "zustand";

export const useAuthStore = create((set) => ({
    seed: '',
    setSeed: (seedPhrase) => set({ seed: seedPhrase }),
}));
