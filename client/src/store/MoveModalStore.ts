import { create } from 'zustand';

interface MoveModalState {
  isOpen: boolean;
  userBookId: string | null;
  currentShelfIds: string[];
  setOpen: (open: boolean) => void;
  openModal: (userBookId: string, currentShelfIds: string[]) => void;
  closeModal: () => void;
}

export const useMoveModalStore = create<MoveModalState>((set) => ({
  isOpen: false,
  userBookId: null,
  currentShelfIds: [],
  setOpen: (open) => set({isOpen: true}),
  openModal: (userBookId, currentShelfIds) => set({isOpen: true, userBookId, currentShelfIds}),
  closeModal: () => set({isOpen: false, userBookId: null, currentShelfIds: []}),
}));