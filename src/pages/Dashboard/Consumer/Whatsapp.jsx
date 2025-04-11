// // // import React from 'react';

// // // const Whatsapp = () => {
// // //     return (
// // //         <div>
// // //             <a href="https://wa.me/8801683524783?text=Hello%20there!" target="_blank">
// // //   WhatsApp Chat
// // // </a>
// // //         </div>
// // //     );
// // // };

// // // export default Whatsapp;
// // import React from 'react';

// // const Whatsapp = () => {
// //   return (
// //     <div style={{
// //       display: 'flex',
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       height: '100vh',
// //       backgroundColor: '#f0f2f5'
// //     }}>
// //       <a
// //         href="https://wa.me/8801683524783?text=Hello%20there!"
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="whatsapp-link"
// //         style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: '10px',
// //           padding: '15px 25px',
// //           backgroundColor: '#25D366',
// //           color: 'white',
// //           borderRadius: '30px',
// //           textDecoration: 'none',
// //           fontSize: '1.2rem',
// //           fontWeight: '500',
// //           transition: 'all 0.3s ease',
// //           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
// //         }}
// //         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
// //         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
// //       >
// //         <svg
// //           xmlns="http://www.w3.org/2000/svg"
// //           width="24"
// //           height="24"
// //           viewBox="0 0 24 24"
// //           fill="currentColor"
// //         >
// //           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
// //         </svg>
// //         Chat via WhatsApp
// //       </a>
// //     </div>
// //   );
// // };

// // export default Whatsapp;
// import React, { useEffect, useState } from "react";
// import emailjs from "emailjs-com";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// // (Other icon imports remain as in your original code)
// import {
//   FaCar,
//   FaIdCard,
//   FaPhone,
//   FaHome,
//   FaUserTie,
//   FaTools,
//   FaUser,
// } from "react-icons/fa";
// import { GiSteeringWheel } from "react-icons/gi";
// import { MdDirectionsCar, MdEmergency } from "react-icons/md";

// const Whatsapp = () => {
//   const { user } = useAuth();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [contactMsg, setContactMsg] = useState("");
//   const [contactFeedback, setContactFeedback] = useState("");
//   const [contactSending, setContactSending] = useState(false);
//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         if (!user?.email) {
//           throw new Error("User email is not available");
//         }
//         const response = await axiosPublic.get(`/users/getUser/${user.email}`);
//         setProfileData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [user?.email]);

//   // Handler for the contact form submission
//   const handleContactSubmit = (e) => {
//     e.preventDefault();
//     setContactSending(true);
//     setContactFeedback("");

//     // Get sender details from profileData
//     const senderEmail = profileData.email; // user email from your profile
//     const senderName = profileData.fullName || "Consumer";

//     // EMAILJS CONFIGURATION:
//     const serviceID = "service_8wka8vs"; // Replace with your service ID
//     const adminTemplateID = "template_0gxacup"; // Template for admin email (to sixbitph@gmail.com)
//     const autoReplyTemplateID = "template_6gimwyg"; // Create a second template for auto-reply
//     const userID = "4u0Kc4HOqa9q7VLWS"; // Replace with your EmailJS public key

//     // Parameters for the email sent to your support inbox
//     const templateParamsAdmin = {
//       from_email: senderEmail,    // sender's email
//       from_name: senderName,      // sender's name
//       message: contactMsg,        // message from the user
//       to_email: "sixbitph@gmail.com",
//     };

//     // Send email to admin
//     emailjs.send(serviceID, adminTemplateID, templateParamsAdmin, userID)
//       .then(() => {
//         // After admin email, send auto-reply to the sender
//         const templateParamsAuto = {
//           to_email: senderEmail, // sender receives the auto-reply
//           from_name: "6Bit Support Team", // name for auto reply
          
//         };

//         emailjs.send(serviceID, autoReplyTemplateID, templateParamsAuto, userID)
//           .then(() => {
//             setContactFeedback("Message sent successfully! An auto-reply has been sent to your email.");
//             setContactMsg("");
//             setContactSending(false);
//           })
//           .catch((err) => {
//             console.error("Error sending auto-reply:", err);
//             setContactFeedback("Message sent, but failed to send auto-reply.");
//             setContactSending(false);
//           });
//       })
//       .catch((err) => {
//         console.error("Error sending admin email:", err);
//         setContactFeedback("Failed to send your message. Please try again later.");
//         setContactSending(false);
//       });
//   };

//   // Basic loading and error states
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-32 w-32 bg-gray-300 rounded-full mb-4"></div>
//           <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
//           <div className="h-4 w-32 bg-gray-300 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//         <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Error Loading Profile
//           </h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
//           <div className="text-gray-500 text-5xl mb-4">👤</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Profile Not Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             We couldn't find any profile data for your account.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Sample role-based styling function (retained from your original code)
//   const getRoleDetails = (role) => {
//     switch (role) {
//       case "provider":
//         return {
//           color: "from-blue-500 to-blue-600",
//           icon: <FaUserTie className="text-4xl text-blue-100" />,
//           title: "Service Provider",
//           description: "You can offer services and manage your offerings",
//         };
//       case "consumer":
//         return {
//           color: "from-green-500 to-green-600",
//           icon: <FaUser className="text-4xl text-green-100" />,
//           title: "Consumer",
//           description: "You can book services and manage your requests",
//         };
//       case "driver":
//         return {
//           color: "from-purple-500 to-purple-600",
//           icon: <GiSteeringWheel className="text-4xl text-purple-100" />,
//           title: "Driver",
//           description: "You can provide driving services",
//         };
//       case "ownerDriver":
//         return {
//           color: "from-indigo-500 to-indigo-600",
//           icon: <MdDirectionsCar className="text-4xl text-indigo-100" />,
//           title: "Owner & Driver",
//           description: "You own a vehicle and can provide driving services",
//         };
//       case "providerOnly":
//         return {
//           color: "from-amber-500 to-amber-600",
//           icon: <FaTools className="text-4xl text-amber-100" />,
//           title: "Service Provider Only",
//           description: "You provide services but don't drive",
//         };
//       default:
//         return {
//           color: "from-gray-500 to-gray-600",
//           icon: <FaUser className="text-4xl text-gray-100" />,
//           title: "User",
//           description: "Standard user account",
//         };
//     }
//   };

//   const roleDetails = getRoleDetails(profileData.role);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Profile Header */}
//         <div className={`bg-gradient-to-r ${roleDetails.color} rounded-3xl shadow-xl overflow-hidden mb-8`}>
//           <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
//             <div className="relative mb-6 md:mb-0 md:mr-8">
//               <img
//                 src={
//                   profileData.profileImage ||
//                   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
//                 }
//                 alt="Profile"
//                 className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/80 shadow-lg"
//               />
//               <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
//                 {roleDetails.icon}
//               </div>
//             </div>

//             <div className="text-center md:text-left">
//               <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                 {profileData.fullName}
//               </h1>
//               <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
//                 <span className="text-white font-semibold">
//                   {profileData.role}
//                 </span>
//               </div>
//               <p className="text-white/90 max-w-lg">
//                 {roleDetails.description}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Rest of the profile (personal info, etc.) goes here */}
//         {/* ... */}

//         {/* Contact Form Section */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10 p-6 max-w-lg mx-auto">
//           <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
//           <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
//             <textarea
//               placeholder="Write your message here..."
//               value={contactMsg}
//               onChange={(e) => setContactMsg(e.target.value)}
//               required
//               className="w-full h-32 p-2 border border-gray-300 rounded"
//             />
//             <button
//               type="submit"
//               disabled={contactSending}
//               className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               {contactSending ? "Sending..." : "Send Message"}
//             </button>
//             {contactFeedback && (
//               <p className={`mt-2 text-center ${contactFeedback.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
//                 {contactFeedback}
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//       <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#f0f2f5'
//     }}>
//       <a
//         href="https://wa.me/8801683524783?text=Hello%20there!"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="whatsapp-link"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '10px',
//           padding: '15px 25px',
//           backgroundColor: '#25D366',
//           color: 'white',
//           borderRadius: '30px',
//           textDecoration: 'none',
//           fontSize: '1.2rem',
//           fontWeight: '500',
//           transition: 'all 0.3s ease',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//         }}
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//         </svg>
//         Chat via WhatsApp
//       </a>
//     </div>
//     </div>
//   );
// };

// export default Whatsapp;
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
  FaCar,
  FaIdCard,
  FaPhone,
  FaHome,
  FaUserTie,
  FaTools,
  FaUser,
} from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { MdDirectionsCar, MdEmergency } from "react-icons/md";

const Whatsapp = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactMsg, setContactMsg] = useState("");
  const [contactFeedback, setContactFeedback] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user?.email) {
          throw new Error("User email is not available");
        }
        const response = await axiosPublic.get(`/users/getUser/${user.email}`);
        setProfileData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [user?.email]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSending(true);
    setContactFeedback("");

    const senderEmail = profileData.email;
    const senderName = profileData.fullName || "Consumer";

    const serviceID = "service_8wka8vs";
    const adminTemplateID = "template_0gxacup";
    const autoReplyTemplateID = "template_6gimwyg";
    const userID = "4u0Kc4HOqa9q7VLWS";

    const templateParamsAdmin = {
      from_email: senderEmail,
      from_name: senderName,
      message: contactMsg,
      to_email: "sixbitph@gmail.com",
    };

    emailjs
      .send(serviceID, adminTemplateID, templateParamsAdmin, userID)
      .then(() => {
        const templateParamsAuto = {
          to_email: senderEmail,
          from_name: "6Bit Support Team",
        };
        emailjs
          .send(serviceID, autoReplyTemplateID, templateParamsAuto, userID)
          .then(() => {
            setContactFeedback(
              "Message sent successfully! An auto-reply has been sent to your email."
            );
            setContactMsg("");
            setContactSending(false);
          })
          .catch((err) => {
            console.error("Error sending auto-reply:", err);
            setContactFeedback("Message sent, but failed to send auto-reply.");
            setContactSending(false);
          });
      })
      .catch((err) => {
        console.error("Error sending admin email:", err);
        setContactFeedback("Failed to send your message. Please try again later.");
        setContactSending(false);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-40 w-40 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-8 w-64 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-gray-500 text-5xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any profile data for your account.
          </p>
        </div>
      </div>
    );
  }

  const getRoleDetails = (role) => {
    switch (role) {
      case "provider":
        return {
          color: "from-blue-500 to-blue-700",
          icon: <FaUserTie className="text-4xl text-blue-100" />,
          title: "Service Provider",
          description: "You can offer services and manage your offerings",
        };
      case "consumer":
        return {
          color: "from-green-500 to-green-700",
          icon: <FaUser className="text-4xl text-green-100" />,
          title: "Consumer",
          description: "You can book services and manage your requests",
        };
      case "driver":
        return {
          color: "from-purple-500 to-purple-700",
          icon: <GiSteeringWheel className="text-4xl text-purple-100" />,
          title: "Driver",
          description: "You can provide driving services",
        };
      case "ownerDriver":
        return {
          color: "from-indigo-500 to-indigo-700",
          icon: <MdDirectionsCar className="text-4xl text-indigo-100" />,
          title: "Owner & Driver",
          description: "You own a vehicle and can provide driving services",
        };
      case "providerOnly":
        return {
          color: "from-amber-500 to-amber-700",
          icon: <FaTools className="text-4xl text-amber-100" />,
          title: "Service Provider Only",
          description: "You provide services but don't drive",
        };
      default:
        return {
          color: "from-gray-500 to-gray-700",
          icon: <FaUser className="text-4xl text-gray-100" />,
          title: "User",
          description: "Standard user account",
        };
    }
  };

  const roleDetails = getRoleDetails(profileData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div
          className={`bg-gradient-to-r ${roleDetails.color} rounded-3xl shadow-2xl overflow-hidden mb-8 relative transform transition-all duration-500 hover:shadow-3xl`}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-grey.png')] opacity-10"></div>
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center relative z-10">
            <div className="relative mb-6 md:mb-0 md:mr-8 transform hover:scale-105 transition-transform duration-300">
              <img
                src={
                  profileData.profileImage ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                }
                alt="Profile"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white/80 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                {roleDetails.icon}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {profileData.fullName}
              </h1>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
                <span className="text-white font-semibold text-lg">
                  {profileData.role}
                </span>
              </div>
              <p className="text-white/90 max-w-lg text-lg">
                {roleDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10 p-8 max-w-lg mx-auto transform transition-all duration-500 hover:shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Contact Us
          </h2>
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <textarea
                placeholder="Write your message here..."
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                required
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={contactSending}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
            >
              {contactSending ? "Sending..." : "Send Message"}
            </button>
            {contactFeedback && (
              <p
                className={`mt-2 text-center animate-fadeIn ${
                  contactFeedback.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {contactFeedback}
              </p>
            )}
          </form>
        </div>

        {/* WhatsApp Link Section */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://wa.me/8801683524783?text=Hello%20there!"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

// Add this CSS in your stylesheet or a <style> tag in your project
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in;
  }
`;
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

export default Whatsapp;