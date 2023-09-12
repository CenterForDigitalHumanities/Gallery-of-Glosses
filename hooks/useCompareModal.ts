import { create } from "zustand";

interface CompareModalStore {
  isOpen: boolean;
  selectedRows: any;
  onOpen: () => void;
  onClose: () => void;
}

const useCompareModal = create<CompareModalStore>((set) => ({
  isOpen: false,
  selectedRows: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCompareModal;
