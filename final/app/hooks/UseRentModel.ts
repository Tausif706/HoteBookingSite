import { create } from "zustand";
interface RentModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const UseRentModel = create<RentModelStore>((set) => ({
    isOpen: false,
    onOpen: () =>set({ isOpen: true}),
    onClose: () =>set({ isOpen: false})
  
}));
