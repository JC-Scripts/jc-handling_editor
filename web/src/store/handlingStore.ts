import {create} from "zustand"

type Handling = {
    name: string;
    value: number;
}

type HandlingStore = {
    handlings: Handling[];
    setHandlings: (handlings: Handling[]) => void;
    updateHandlingStore: (handling: Handling) => void;
    clearHandlingStore: () => void; 
}


export const useHandlingStore = create<HandlingStore>((set) => ({
    handlings: [],
    setHandlings: (handlings) => set({ handlings }),
    updateHandlingStore: (handling) => set((state) => ({
        handlings: state.handlings.map((h) => h.name === handling.name ? handling : h)
    })),
    clearHandlingStore: () => set({ handlings: [] })
}));
