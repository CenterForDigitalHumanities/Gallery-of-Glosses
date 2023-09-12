"use client";

import CompareModal from "@/app/compare/components/CompareModal";
//import ManuscriptMapModal from "@/app/map/components/ManuscriptMapModal";
import { useEffect, useState } from "react";

/**
 * Interface for the ModalProviderProps.
 * Currently, there are no props associated with the ModalProvider.
 * This interface can be extended in the future if necessary.
 */
interface ModalProviderProps {}

/**
 * The ModalProvider component serves as a provider for a modal window.
 * It ensures the modal is not shown during server-side rendering,
 * and maintains a state variable 'isMounted' to determine if the component has been mounted.
 */
const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  /**
   * State variable 'isMounted'.
   * Initializes as false, representing that the component is not mounted yet.
   */
  const [isMounted, setIsMounted] = useState(false);

  /**
   * useEffect hook sets 'isMounted' to true when the component is mounted.
   * This ensures the modal is not shown during server-side rendering.
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted, return null, thereby not rendering anything.
  if (!isMounted) {
    return null;
  }

  // When the component is mounted, the modal is returned
  return (
    <>
      <CompareModal />
    </>
  );
};

export default ModalProvider;
