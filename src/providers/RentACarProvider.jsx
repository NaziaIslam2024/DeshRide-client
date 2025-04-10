import { createContext, useContext, useState } from "react";
import useRole from "../hooks/useRole";

const RentCarContext = createContext();

export const RentACarProvider = ({ children }) => {
  //

  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentMessage, setRentMessage] = useState("");
  //   const
  const [userRole, userData] = useRole();
  // console.log(userData);

  //?
  const [car, setCar] = useState(null);
  const handleRentRequest = (message) => {
    const requesterName = userData?.fullName;
    const requesterEmail = userData?.email;
    const requesterUserName = userData?.userName;
    const requesterPhone = userData?.phoneNumber;

    const rentRequestData = {
      ...car,
      rentMessage: message,
      requesterName,
      requesterEmail,
      requesterUserName,
      requesterPhone,
    };
    console.log(rentRequestData);
  };
  //?

  return (
    <RentCarContext.Provider
      value={{
        selectedCar,
        setSelectedCar,
        showRentModal,
        setShowRentModal,
        rentMessage,
        setRentMessage,

        handleRentRequest,
        setCar,
      }}
    >
      {children}
    </RentCarContext.Provider>
  );
};

// ✅ Your custom hook shortcut
export const useRentCar = () => useContext(RentCarContext);
