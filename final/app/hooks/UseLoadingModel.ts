import { create } from "zustand";

interface LoadingModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoadingModel = create<LoadingModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))

export default useLoadingModel;