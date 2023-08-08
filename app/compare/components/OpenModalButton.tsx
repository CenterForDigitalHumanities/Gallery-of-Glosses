import { MdOutlineOpenInNew } from "react-icons/md";

interface OpenModalButtonProps {
  handleOpen: () => void;
}

export const OpenModalButton: React.FC<OpenModalButtonProps> = ({
  handleOpen,
}) => (
  <button
    onClick={handleOpen}
    className="flex items-center ml-auto bg-bg-secondary-color rounded-md p-2 hover:bg-bg-color transition font-semibold border border-gold hover:shadow-lg"
  >
    <MdOutlineOpenInNew className="mr-2" />
    Open in a modal
  </button>
);
