import { create } from "zustand";
import { Manuscript } from "../lib/Manuscript";

interface ManuscriptMapModalStore {
  isOpen: boolean;
  selectedManuscripts: Manuscript[];
  minYear: number;
  maxYear: number;
  onOpen: () => void;
  onClose: () => void;
}

const useManuscriptMapModal = create<ManuscriptMapModalStore>((set) => ({
  isOpen: false,
  selectedManuscripts: [],
  minYear: 1000,
  maxYear: 1000,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useManuscriptMapModal;
