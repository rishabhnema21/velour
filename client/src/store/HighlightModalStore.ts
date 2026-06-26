import { create } from "zustand";
import type { Highlight } from "@/lib/apifetch/highlight";

interface HighlightModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  userBookId: string | null;
  editingHighlight: Highlight | null;
  openCreateModal: (userBookId: string) => void;
  openEditModal: (highlight: Highlight) => void;
  closeModal: () => void;
}

export const useHighlightModalStore = create<HighlightModalState>((set) => ({
  isOpen: false,
  mode: "create",
  userBookId: null,
  editingHighlight: null,
  openCreateModal: (userBookId) =>
    set({ isOpen: true, mode: "create", userBookId, editingHighlight: null }),
  openEditModal: (highlight) =>
    set({ isOpen: true, mode: "edit", editingHighlight: highlight, userBookId: highlight.userBookId }),
  closeModal: () =>
    set({ isOpen: false, mode: "create", userBookId: null, editingHighlight: null }),
}));