import { create } from 'zustand';

interface BookDrawerState {
    selectedBookId: string | null
    isOpen: boolean
    openDrawer: (bookId: string) => void
    closeDrawer: () => void
}

export const useBookDrawerStore = create<BookDrawerState>((set) => ({
    selectedBookId: null,
    isOpen: false,
    openDrawer: (id) => {
        console.log("Drawer Open");
        set({selectedBookId: id, isOpen: true})},
    closeDrawer: () => set({selectedBookId: null, isOpen: false}),
}))