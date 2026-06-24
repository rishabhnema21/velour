import { create } from "zustand";

interface HighlightModalState {
    isOpen: boolean;
    userBookId: string | null;
    setOpen: (open: boolean) => void;
    openModal: (userBookId: string) => void;
    closeModal: () => void;
}

export const useHighlightModalStore = create<HighlightModalState>((set) => ({
    isOpen: false,
    userBookId: null,
    setOpen: (open) => set({ isOpen: open }),
    openModal: (userBookId) => set({ isOpen: true, userBookId }),
    closeModal: () => set({ isOpen: false, userBookId: null }),
}));