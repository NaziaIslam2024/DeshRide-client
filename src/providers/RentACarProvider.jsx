import { createContext, useContext, useState } from "react";

const RentCarContext = createContext();

export const RentACarProvider = ({ children }) => {
  //

  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentModal, setShowRentModal] = useState(false);
  //   const

  return (
    <RentCarContext.Provider
      value={{ selectedCar, setSelectedCar, showRentModal, setShowRentModal }}
    >
      {children}
    </RentCarContext.Provider>
  );
};

// ✅ Your custom hook shortcut
export const useRentCar = () => useContext(RentCarContext);
