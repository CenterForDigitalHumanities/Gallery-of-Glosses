import { create } from "zustand";

interface ManuscriptMapStore {
  isOpen: boolean;
  selectedManuscripts: any;
  minYear: number;
  maxYear: number;
  onOpen: () => void;
  onClose: () => void;
}

const useManuscriptMapModal = create<ManuscriptMapStore>((set) => ({
  isOpen: false,
  selectedManuscripts: [],
  minYear: 1000,
  maxYear: 1000,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useManuscriptMapModal;
