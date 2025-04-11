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

  const [dateRange, setDateRange] = useState([null, null]);

  const [startDate, endDate] = dateRange;
  // console.log(dateRange);
  // console.log(startDate);

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

  //* rent car request data handle here
  const handleAccept = async (_id) => {
    const rentRequestData = {
      rentStatus: "ongoing",
    };

    try {
      const res = await axiosPublic.put(
        `/car-rental/update-car-rental/${_id}`,
        rentRequestData
      );

      console.log(res.data);

      if (res.data) {
        toast.success("Car rental request accepted successfully!", {
          position: "top-left",
        });
      }
    } catch (error) {
      console.error("Error accepting rental:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleReject = async (_id) => {
    const rentRequestData = {
      rentStatus: "rejected",
    };

    // send data
    try {
      const res = await axiosPublic.put(
        `/car-rental/update-car-rental/${_id}`,
        rentRequestData
      );

      console.log(res.data);

      if (res.data) {
        toast.success("Car rental request Rejected successfully!", {
          position: "top-left",
        });
      }
    } catch (error) {
      console.error("Error rejecting rental:", error);
      toast.error("Something went wrong!");
    }
  };

  const [showChatModal, setShowChatModal] = useState(false);
  // console.log(showChatModal);

  // chat modal
  const [chatData, setChatData] = useState({
    rentalRequestId: "123456",
    requesterName: "Requester",
    requesterEmail: "",
    providerName: "Provider",
    providerEmail: "",
    image: "https://img.icons8.com/?size=100&id=108294&format=png&color=000000",
    messages: [
      { id: 1, sender: "user", message: "Hey, how are you?", time: "2:30 PM" },
      {
        id: 2,
        sender: "other",
        message: "I'm doing great! Thanks for asking.",
        time: "2:31 PM",
      },
      {
        id: 3,
        sender: "user",
        message: "That's good to hear! What are you up to?",
        time: "2:31 PM",
      },
      {
        id: 4,
        sender: "other",
        message: "Just working on some projects. How about you?",
        time: "2:32 PM",
      },
      {
        id: 5,
        sender: "user",
        message: "Same here! Working on a new website design.",
        time: "2:33 PM",
      },
      {
        id: 6,
        sender: "other",
        message: "That sounds interesting! What kind of website is it?",
        time: "2:34 PM",
      },
      {
        id: 7,
        sender: "user",
        message:
          "It's a social media platform, kind of like Facebook but for a specific niche.",
        time: "2:35 PM",
      },
      {
        id: 8,
        sender: "other",
        message: "Wow, that's cool! Would love to see it when it's done.",
        time: "2:36 PM",
      },
      {
        id: 9,
        sender: "user",
        message: "Sure, I'll show you once it's ready!",
        time: "2:36 PM",
      },
      {
        id: 10,
        sender: "other",
        message: "Looking forward to it! 😊",
        time: "2:37 PM",
      },
      {
        id: 11,
        sender: "user",
        message: "By the way, are you free this weekend?",
        time: "2:38 PM",
      },
      {
        id: 12,
        sender: "other",
        message: "Yes, I should be! What do you have in mind?",
        time: "2:39 PM",
      },
      {
        id: 13,
        sender: "user",
        message: "There's this new coffee shop downtown, want to check it out?",
        time: "2:40 PM",
      },
      {
        id: 14,
        sender: "other",
        message: "That sounds perfect! What time were you thinking?",
        time: "2:41 PM",
      },
      {
        id: 15,
        sender: "user",
        message: "How are you Mehedi?",
        time: "2:42 PM",
      },
    ],
  });

  //*

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

        //
        handleAccept,
        handleReject,
        showChatModal,
        setShowChatModal,

        // chat
        chatData,
      }}
    >
      {children}
    </RentCarContext.Provider>
  );
};

// ✅ Your custom hook shortcut
export const useRentCar = () => useContext(RentCarContext);
