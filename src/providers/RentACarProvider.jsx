import { createContext, useContext, useState } from "react";
import useRole from "../hooks/useRole";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const RentCarContext = createContext();

export const RentACarProvider = ({ children }) => {
  //

  const [selectedCar, setSelectedCar] = useState(null);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentMessage, setRentMessage] = useState("");
  //   const
  const [userRole, userData] = useRole();
  const axiosPublic = useAxiosPublic();

  //?
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  console.log(dateRange);
  console.log(startDate);
  //?

  //?
  const [car, setCar] = useState(null);
  const handleRentRequest = async (message) => {
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
      rentStatus: "pending",
      dateRange,
    };
    console.log(rentRequestData);

    // Send rentRequestData to the server
    const res = await axiosPublic.post(
      "/car-rental/add-car-rental",
      rentRequestData
    );

    console.log(res.data);
    if (res.data.message === "Car rental added successfully") {
      toast.success("Car rental request sent successfully!", {
        position: "top-left",
      });
    }

    // Reset the car state after sending the request
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

        dateRange,
        setDateRange,
        startDate,
        endDate,
      }}
    >
      {children}
    </RentCarContext.Provider>
  );
};

// ✅ Your custom hook shortcut
export const useRentCar = () => useContext(RentCarContext);
