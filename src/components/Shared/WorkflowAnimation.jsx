
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaUserShield, 
//   FaCarSide, 
//   FaUsers, 
//   FaWallet,
//   FaMapMarkerAlt,
//   FaComment,
//   FaUser,
//   FaTimes
// } from 'react-icons/fa';

// const WorkflowAnimation = () => {
//   // States for cars, wallet, filter, modals, users, messaging, sorting, & feature checklist
//   const [cars, setCars] = useState([]);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [filter, setFilter] = useState('');
//   const [showMap, setShowMap] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [showUserManagement, setShowUserManagement] = useState(false);
//   const [sortCriteria, setSortCriteria] = useState('nameAsc');

//   // Messaging state for the user chat modal (on-site chat)
//   const [messages, setMessages] = useState([
//     { id: 1, text: 'Hello! Is the car available?' },
//     { id: 2, text: 'Yes, it’s ready for you!' },
//   ]);
//   const [newMessage, setNewMessage] = useState('');

//   // New state for direct messages from User to Admin
//   const [adminMessage, setAdminMessage] = useState('');
//   const [adminInbox, setAdminInbox] = useState([]);

//   const [users, setUsers] = useState([
//     { id: 1, name: 'Alice', role: 'User' },
//     { id: 2, name: 'Bob', role: 'Provider' },
//     { id: 3, name: 'Charlie', role: 'Admin' },
//     { id: 4, name: 'David', role: 'Driver' },
//   ]);

//   // Feature checklist state with dynamic numbering
//   const initialFeatures = [
//     "Consumer Registration (unique email & phone)",
//     "Driver/Provider Registration (choose one category, provide NId, Driver's License, Car Details)",
//     "Admin verifies and approves user registrations, maintains website",
//     "Admin can advertise specific cars to users",
//     "Admin,User,Provider can update their profile",
//     "Login: Registered users log in with their credentials",
//     "Consumers sort cars by location, time, tour, seat",
//     "Single ride share (Car category, location input, notifications, driver chat, confirmation)",
//     "Rent a car for a trip (multiple days booking)",
//     "User to Management Direct Message Through email and Whatsapp",
//     "Migration from user to provider and Vice versa",
//     "Admin can manage users and their roles",
//     "Admin can manage cars and their statuses",
//     "Fair Calculation Policy: Price/fare calculated dynamically",
//     "Discounts for consumers and bonus for drivers (driver-only bonus)",
//     "Payment: Integration with SSLCommerz and Stripe",
//     "Account Balance management",
//     "Dashboard - Admin manages verification, transactions, fee allocation, monitoring",
//     "Provider/Driver dashboard - Manage fleet, income tracking, reviews",
//     "Notification and Live Chat on Site",
//     "Live Vehicle Tracking on Google Map",
   
//   ];
  
//   const [featureChecklist, setFeatureChecklist] = useState(
//     initialFeatures.map((feature, index) => ({
//       id: index + 1,
//       feature: `Feature ${index + 1}: ${feature}`,
//       completed: false,
//     }))
//   );

//   // Car action handlers
//   const addCar = () => {
//     const newCar = {
//       id: Date.now(),
//       name: `Car ${cars.length + 1}`,
//       status: 'pending',
//       renterId: null,
//     };
//     setCars([...cars, newCar]);
//   };

//   const approveCar = (carId) => {
//     setCars(cars.map(car => 
//       car.id === carId ? { ...car, status: 'approved' } : car
//     ));
//   };

//   const rentCar = (carId) => {
//     setCars(cars.map(car => 
//       car.id === carId ? { ...car, status: 'rented', renterId: 'user1' } : car
//     ));
//     setWalletBalance(walletBalance + 100);
//   };

//   const deleteRental = (carId) => {
//     setCars(cars.map(car => 
//       car.id === carId && car.renterId === 'user1' 
//         ? { ...car, status: 'approved', renterId: null } 
//         : car
//     ));
//   };

//   // Filter and sort available cars
//   const filteredCars = cars.filter(car => 
//     car.status === 'approved' && 
//     !car.renterId && 
//     car.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   const availableCars = filteredCars.sort((a, b) => {
//     if (sortCriteria === 'nameAsc') {
//       return a.name.localeCompare(b.name);
//     } else if (sortCriteria === 'nameDesc') {
//       return b.name.localeCompare(a.name);
//     }
//     return 0;
//   });

//   // Role badge styling
//   const getRoleBadgeClass = (role) => {
//     switch (role) {
//       case 'User': return 'bg-green-100 text-green-800';
//       case 'Provider': return 'bg-blue-100 text-blue-800';
//       case 'Admin': return 'bg-red-100 text-red-800';
//       case 'Driver': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Messaging system for chat modal handler (user)
//   const sendMessage = () => {
//     if (newMessage.trim() !== '') {
//       const message = {
//         id: Date.now(),
//         text: newMessage.trim(),
//       };
//       setMessages([...messages, message]);
//       setNewMessage('');
//     }
//   };

//   // Handler for direct message to Admin from the User side
//   const sendAdminMessage = () => {
//     if (adminMessage.trim() !== '') {
//       const msg = { id: Date.now(), text: adminMessage.trim() };
//       setAdminInbox([...adminInbox, msg]);
//       setAdminMessage('');
//       console.log('Direct message sent to admin:', msg.text);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">Website Workflow Visualization</h1>

//         <div className="grid grid-cols-3 gap-8">
//           {/* Provider Section */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ type: 'spring', stiffness: 100 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <FaCarSide className="text-blue-500 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold">Provider</h2>
//             </div>
//             <button 
//               className="btn btn-primary w-full mb-4"
//               onClick={addCar}
//             >
//               Add New Car
//             </button>
//             <h3 className="font-medium mb-2">My Vehicles</h3>
//             <AnimatePresence>
//               {cars.map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-blue-50 p-2 rounded-lg mb-2"
//                 >
//                   {car.name} - {car.status}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <h3 className="font-medium mt-4">Wallet: ৳ {walletBalance}</h3>
//           </motion.div>

//           {/* Admin Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <FaUserShield className="text-red-500 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold">Admin</h2>
//             </div>
//             <h3 className="font-medium mb-2">Pending Requests</h3>
//             <AnimatePresence>
//               {cars.filter(car => car.status === 'pending').map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-red-50 p-2 rounded-lg mb-2 flex justify-between items-center"
//                 >
//                   <span>{car.name}</span>
//                   <button 
//                     className="btn btn-success btn-sm"
//                     onClick={() => approveCar(car.id)}
//                   >
//                     Approve
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {/* New block: Display direct messages sent from Users */}
//             <div className="mt-4">
//               <h3 className="font-medium mb-2">User Messages</h3>
//               <AnimatePresence>
//                 {adminInbox.map(msg => (
//                   <motion.div
//                     key={msg.id}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="bg-blue-50 p-2 rounded-lg mb-2"
//                   >
//                     {msg.text}
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//             <button 
//               className="btn btn-danger w-full mt-4"
//               onClick={() => setShowUserManagement(true)}
//             >
//               Manage Users
//             </button>
//           </motion.div>

//           {/* User Section */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ type: 'spring', stiffness: 100 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <FaUsers className="text-green-500 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold">User</h2>
//             </div>
//             <input 
//               type="text" 
//               placeholder="Filter by name" 
//               value={filter} 
//               onChange={e => setFilter(e.target.value)}
//               className="w-full p-2 mb-4 border rounded"
//             />
//             {/* Sorting Dropdown */}
//             <div className="mb-4">
//               <label className="mr-2 font-medium">Sort Cars:</label>
//               <select
//                 value={sortCriteria}
//                 onChange={e => setSortCriteria(e.target.value)}
//                 className="border p-1 rounded"
//               >
//                 <option value="nameAsc">Name Ascending</option>
//                 <option value="nameDesc">Name Descending</option>
//               </select>
//             </div>
//             <h3 className="font-medium mb-2">Available Cars</h3>
//             <AnimatePresence>
//               {availableCars.map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center"
//                 >
//                   <span>{car.name}</span>
//                   <button 
//                     className="btn btn-success btn-sm"
//                     onClick={() => rentCar(car.id)}
//                   >
//                     Rent
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <h3 className="font-medium mt-4 mb-2">My Rentals</h3>
//             <AnimatePresence>
//               {cars.filter(car => car.status === 'rented' && car.renterId === 'user1').map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center"
//                 >
//                   <span>{car.name}</span>
//                   <div>
//                     <button 
//                       className="btn btn-danger btn-sm mr-2"
//                       onClick={() => deleteRental(car.id)}
//                     >
//                       Delete
//                     </button>
//                     <button 
//                       className="btn btn-info btn-sm mr-2"
//                       onClick={() => setShowMap(true)}
//                     >
//                       <FaMapMarkerAlt />
//                     </button>
//                     <button 
//                       className="btn btn-info btn-sm"
//                       onClick={() => setShowChat(true)}
//                     >
//                       <FaComment />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {/* New Box: Direct Message to Admin */}
//             <div className="bg-white p-4 rounded-lg mt-4 border">
//               <h3 className="font-medium mb-2">Direct Message to Admin</h3>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={adminMessage}
//                   onChange={e => setAdminMessage(e.target.value)}
//                   placeholder="Type your message..."
//                   className="flex-grow border rounded-l p-2"
//                 />
//                 <button
//                   onClick={sendAdminMessage}
//                   className="btn btn-primary rounded-r"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Updated Feature Checklist Section */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-lg mt-8">
//           <div className="bg-white p-6 rounded-lg shadow-xl">
//             <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">Feature Checklist</h2>
//             <div className="space-y-3">
//               {featureChecklist.map(featureItem => (
//                 <div key={featureItem.id} className="flex items-center bg-gray-50 p-3 rounded-md">
//                   <input 
//                     type="checkbox"
//                     checked={featureItem.completed}
//                     onChange={() =>
//                       setFeatureChecklist(featureChecklist.map(f => 
//                         f.id === featureItem.id ? { ...f, completed: !f.completed } : f
//                       ))
//                     }
//                     className="form-checkbox h-5 w-5 text-indigo-600"
//                   />
//                   <span className="ml-3 text-gray-800 font-medium">{featureItem.feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* User Management Modal */}
//         {showUserManagement && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={() => setShowUserManagement(false)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg w-96"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               onClick={e => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium">Manage Users</h3>
//                 <button 
//                   onClick={() => setShowUserManagement(false)} 
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//               <AnimatePresence>
//                 {users.map(user => (
//                   <motion.div
//                     key={user.id}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="p-2 hover:bg-gray-100 rounded"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <FaUser className="text-gray-500 mr-2" />
//                         <span>{user.name}</span>
//                         <span className={`ml-2 px-2 py-1 rounded ${getRoleBadgeClass(user.role)}`}>
//                           {user.role}
//                         </span>
//                       </div>
//                       <div>
//                         <select
//                           value={user.role}
//                           onChange={e => {
//                             const newRole = e.target.value;
//                             setUsers(users.map(u => 
//                               u.id === user.id ? { ...u, role: newRole } : u
//                             ));
//                           }}
//                           className="border rounded p-1 mr-2"
//                         >
//                           <option value="User">User</option>
//                           <option value="Provider">Provider</option>
//                           <option value="Admin">Admin</option>
//                           <option value="Driver">Driver</option>
//                         </select>
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() => setUsers(users.filter(u => u.id !== user.id))}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Location Tracking Modal */}
//         {showMap && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={() => setShowMap(false)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg relative"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//             >
//               <h3 className="text-lg font-medium mb-4">Track Location</h3>
//               <div className="w-64 h-40 bg-gray-200 relative">
//                 <motion.div
//                   className="absolute"
//                   animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                 >
//                   <FaMapMarkerAlt className="text-red-500 text-2xl" />
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Messaging Modal */}
//         {showChat && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={() => setShowChat(false)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg w-full max-w-md"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               onClick={e => e.stopPropagation()}
//             >
//               <h3 className="text-lg font-medium mb-4">Messages</h3>
//               <div className="space-y-2 mb-4">
//                 <AnimatePresence>
//                   {messages.map(message => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 20 }}
//                       className="bg-gray-100 p-2 rounded"
//                     >
//                       {message.text}
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//               <div className="flex">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={e => setNewMessage(e.target.value)}
//                   placeholder="Type your message..."
//                   className="flex-grow border rounded-l p-2"
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="btn btn-primary rounded-r"
//                 >
//                   Send
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkflowAnimation;


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserShield, 
  FaCarSide, 
  FaUsers, 
  FaWallet,
  FaMapMarkerAlt,
  FaComment,
  FaUser,
  FaTimes,
  FaCheckCircle,
  FaHourglassHalf
} from 'react-icons/fa';

const WorkflowAnimation = () => {
  // States for cars, wallet, filter, modals, users, messaging, sorting, & feature checklist
  const [cars, setCars] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [filter, setFilter] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('nameAsc');

  // Messaging state for the user chat modal (on-site chat)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! Is the car available?' },
    { id: 2, text: 'Yes, it’s ready for you!' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // New state for direct messages from User to Admin
  const [adminMessage, setAdminMessage] = useState('');
  const [adminInbox, setAdminInbox] = useState([]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', role: 'User' },
    { id: 2, name: 'Bob', role: 'Provider' },
    { id: 3, name: 'Charlie', role: 'Admin' },
    { id: 4, name: 'David', role: 'Driver' },
  ]);

  // Feature checklist state with dynamic numbering
  const initialFeatures = [
    "Consumer Registration (unique email & phone)",
    "Driver/Provider Registration (choose one category, provide NId, Driver's License, Car Details)",
    "Admin verifies and approves user registrations, maintains website",
    "Admin can advertise specific cars to users",
    "Admin,User,Provider can update their profile",
    "Login: Registered users log in with their credentials",
    "Consumers sort cars by location, time, tour, seat",
    "Single ride share (Car category, location input, notifications, driver chat, confirmation)",
    "Rent a car for a trip (multiple days booking)",
    "User to Management Direct Message Through email and Whatsapp",
    "Migration from user to provider and Vice versa",
    "Admin can manage users and their roles",
    "Admin can manage cars and their statuses",
    "Fair Calculation Policy: Price/fare calculated dynamically",
    "Discounts for consumers and bonus for drivers (driver-only bonus)",
    "Payment: Integration with SSLCommerz and Stripe",
    "Account Balance management",
    "Dashboard - Admin manages verification, transactions, fee allocation, monitoring",
    "Provider/Driver dashboard - Manage fleet, income tracking, reviews",
    "Notification and Live Chat on Site",
    "Live Vehicle Tracking on Google Map",
  ];
  
  const [featureChecklist, setFeatureChecklist] = useState(
    initialFeatures.map((feature, index) => ({
      id: index + 1,
      feature: `Feature ${index + 1}: ${feature}`,
      completed: false,
    }))
  );

  // Car action handlers
  const addCar = () => {
    const newCar = {
      id: Date.now(),
      name: `Car ${cars.length + 1}`,
      status: 'pending',
      renterId: null,
    };
    setCars([...cars, newCar]);
  };

  const approveCar = (carId) => {
    setCars(cars.map(car => 
      car.id === carId ? { ...car, status: 'approved' } : car
    ));
  };

  const rentCar = (carId) => {
    setCars(cars.map(car => 
      car.id === carId ? { ...car, status: 'rented', renterId: 'user1' } : car
    ));
    setWalletBalance(walletBalance + 100);
  };

  const deleteRental = (carId) => {
    setCars(cars.map(car => 
      car.id === carId && car.renterId === 'user1' 
        ? { ...car, status: 'approved', renterId: null } 
        : car
    ));
  };

  // Filter and sort available cars
  const filteredCars = cars.filter(car => 
    car.status === 'approved' && 
    !car.renterId && 
    car.name.toLowerCase().includes(filter.toLowerCase())
  );

  const availableCars = filteredCars.sort((a, b) => {
    if (sortCriteria === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'nameDesc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Role badge styling
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'User': return 'bg-green-100 text-green-800';
      case 'Provider': return 'bg-blue-100 text-blue-800';
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Driver': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Messaging system for chat modal handler (user)
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: Date.now(),
        text: newMessage.trim(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  // Handler for direct message to Admin from the User side
  const sendAdminMessage = () => {
    if (adminMessage.trim() !== '') {
      const msg = { id: Date.now(), text: adminMessage.trim() };
      setAdminInbox([...adminInbox, msg]);
      setAdminMessage('');
      console.log('Direct message sent to admin:', msg.text);
    }
  };

  // Demo function for advertising a car (in Admin section)
  const advertiseCar = () => {
    alert("The car has been advertised on the homepage successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Website Workflow Visualization</h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Provider Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaCarSide className="text-blue-500 text-2xl mr-2" />
              <h2 className="text-xl font-semibold">Provider</h2>
            </div>
            <button 
              className="btn btn-primary w-full mb-4"
              onClick={addCar}
            >
              Add New Car
            </button>
            <h3 className="font-medium mb-2">My Vehicles</h3>
            <AnimatePresence>
              {cars.map(car => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-blue-50 p-2 rounded-lg mb-2"
                >
                  {car.name} - {car.status}
                </motion.div>
              ))}
            </AnimatePresence>
            <h3 className="font-medium mt-4">Wallet: ৳ {walletBalance}</h3>
          </motion.div>

          {/* Admin Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaUserShield className="text-red-500 text-2xl mr-2" />
              <h2 className="text-xl font-semibold">Admin</h2>
            </div>
            <h3 className="font-medium mb-2">Pending Requests</h3>
            <AnimatePresence>
              {cars.filter(car => car.status === 'pending').map(car => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-red-50 p-2 rounded-lg mb-2 flex justify-between items-center"
                >
                  <span>{car.name}</span>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => approveCar(car.id)}
                  >
                    Approve
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* New block: Advertise Specific Car Demo */}
            <div className="mt-4 p-4 bg-purple-50 rounded-lg shadow-inner">
              <h3 className="font-medium mb-2">Advertise a Specific Car</h3>
              <button className="btn btn-primary" onClick={advertiseCar}>
                Advertise Car
              </button>
            </div>

            {/* New block: Display direct messages sent from Users */}
            <div className="mt-4">
              <h3 className="font-medium mb-2"> Messages from Consumers</h3>
              <AnimatePresence>
                {adminInbox.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-blue-50 p-2 rounded-lg mb-2"
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <button 
              className="btn btn-danger w-full mt-4"
              onClick={() => setShowUserManagement(true)}
            >
              Manage Users
            </button>
          </motion.div>

          {/* User Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaUsers className="text-green-500 text-2xl mr-2" />
              <h2 className="text-xl font-semibold">User</h2>
            </div>
            <input 
              type="text" 
              placeholder="Filter by name" 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            {/* Sorting Dropdown */}
            <div className="mb-4">
              <label className="mr-2 font-medium">Sort Cars:</label>
              <select
                value={sortCriteria}
                onChange={e => setSortCriteria(e.target.value)}
                className="border p-1 rounded"
              >
                <option value="nameAsc">Price Ascending</option>
                <option value="nameDesc">Price Descending</option>
              </select>
            </div>
            <h3 className="font-medium mb-2">Available Cars</h3>
            <AnimatePresence>
              {availableCars.map(car => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center"
                >
                  <span>{car.name}</span>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => rentCar(car.id)}
                  >
                    Rent
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <h3 className="font-medium mt-4 mb-2">My Rentals</h3>
            <AnimatePresence>
              {cars.filter(car => car.status === 'rented' && car.renterId === 'user1').map(car => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center"
                >
                  <span>{car.name}</span>
                  <div>
                    <button 
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => deleteRental(car.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => setShowMap(true)}
                    >
                      <FaMapMarkerAlt />
                    </button>
                    <button 
                      className="btn btn-info btn-sm"
                      onClick={() => setShowChat(true)}
                    >
                      <FaComment />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* New Box: Direct Message to Admin */}
            <div className="bg-white p-4 rounded-lg mt-4 border">
              <h3 className="font-medium mb-2">Direct Message to Admin</h3>
              <div className="flex">
                <input
                  type="text"
                  value={adminMessage}
                  onChange={e => setAdminMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow border rounded-l p-2"
                />
                <button
                  onClick={sendAdminMessage}
                  className="btn btn-primary rounded-r"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Updated Feature Checklist Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-lg mt-8">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">
              Feature Checklist
            </h2>
            <div className="space-y-3">
              {featureChecklist.map(featureItem => (
                <div key={featureItem.id} className="flex items-center bg-gray-50 p-3 rounded-md relative">
                  {/* Display tick for features 1 - 13; pending for the rest */}
                  {featureItem.id <= 13 ? (
                    <FaCheckCircle className="absolute -left-6 text-2xl text-green-500" />
                  ) : (
                    <FaHourglassHalf className="absolute -left-6 text-2xl text-yellow-500" />
                  )}
                  <input 
                    type="checkbox"
                    checked={featureItem.completed}
                    onChange={() =>
                      setFeatureChecklist(featureChecklist.map(f => 
                        f.id === featureItem.id ? { ...f, completed: !f.completed } : f
                      ))
                    }
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-800 font-medium">{featureItem.feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Management Modal */}
        {showUserManagement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowUserManagement(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Manage Users</h3>
                <button 
                  onClick={() => setShowUserManagement(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <AnimatePresence>
                {users.map(user => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaUser className="text-gray-500 mr-2" />
                        <span>{user.name}</span>
                        <span className={`ml-2 px-2 py-1 rounded ${getRoleBadgeClass(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                      <div>
                        <select
                          value={user.role}
                          onChange={e => {
                            const newRole = e.target.value;
                            setUsers(users.map(u => 
                              u.id === user.id ? { ...u, role: newRole } : u
                            ));
                          }}
                          className="border rounded p-1 mr-2"
                        >
                          <option value="User">User</option>
                          <option value="Provider">Provider</option>
                          <option value="Admin">Admin</option>
                          <option value="Driver">Driver</option>
                        </select>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {/* Location Tracking Modal */}
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowMap(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-lg font-medium mb-4">Track Location</h3>
              <div className="w-64 h-40 bg-gray-200 relative">
                <motion.div
                  className="absolute"
                  animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaMapMarkerAlt className="text-red-500 text-2xl" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Messaging Modal */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-full max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium mb-4">Messages</h3>
              <div className="space-y-2 mb-4">
                <AnimatePresence>
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-gray-100 p-2 rounded"
                    >
                      {message.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow border rounded-l p-2"
                />
                <button
                  onClick={sendMessage}
                  className="btn btn-primary rounded-r"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WorkflowAnimation;













//////////////////////////////////////////////////////////////////////////////
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaUserShield, 
//   FaCarSide, 
//   FaUsers, 
//   FaWallet,
//   FaMapMarkerAlt,
//   FaComment,
//   FaUser,
//   FaTimes
// } from 'react-icons/fa';

// const WorkflowAnimation = () => {
//   // State for cars, wallet, filter, modals, and users
//   const [cars, setCars] = useState([]);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [filter, setFilter] = useState('');
//   const [showMap, setShowMap] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [showUserManagement, setShowUserManagement] = useState(false);
//   const [users, setUsers] = useState([
//     { id: 1, name: 'Alice', role: 'User' },
//     { id: 2, name: 'Bob', role: 'Provider' },
//     { id: 3, name: 'Charlie', role: 'Admin' },
//     { id: 4, name: 'David', role: 'Driver' },
//   ]);

//   // Car action handlers
//   const addCar = () => {
//     const newCar = {
//       id: Date.now(),
//       name: `Car ${cars.length + 1}`,
//       status: 'pending',
//       renterId: null,
//     };
//     setCars(prevCars => [...prevCars, newCar]);
//   };

//   const approveCar = (carId) => {
//     setCars(prevCars => prevCars.map(car => 
//       car.id === carId ? { ...car, status: 'approved' } : car
//     ));
//   };

//   const rentCar = (carId) => {
//     setCars(prevCars => prevCars.map(car => 
//       car.id === carId ? { ...car, status: 'rented', renterId: 'user1' } : car
//     ));
//     setWalletBalance(prev => prev + 100);
//   };

//   const deleteRental = (carId) => {
//     setCars(prevCars => prevCars.map(car => 
//       car.id === carId && car.renterId === 'user1' 
//         ? { ...car, status: 'approved', renterId: null } 
//         : car
//     ));
//   };

//   // Automated car lifecycle
//   const handleCarLifecycle = () => {
//     const newCar = {
//       id: Date.now(),
//       name: `Car ${cars.length + 1}`,
//       status: 'pending',
//       renterId: null,
//     };
//     setCars(prevCars => [...prevCars, newCar]);

//     setTimeout(() => {
//       approveCar(newCar.id);
//     }, 2000);

//     setTimeout(() => {
//       rentCar(newCar.id);
//     }, 4000);

//     setTimeout(() => {
//       deleteRental(newCar.id);
//     }, 6000);
//   };

//   // Set up interval for automatic car lifecycle
//   useEffect(() => {
//     const intervalId = setInterval(handleCarLifecycle, 8000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Filter available cars
//   const availableCars = cars.filter(car => 
//     car.status === 'approved' && 
//     !car.renterId && 
//     car.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   // Role badge styling
//   const getRoleBadgeClass = (role) => {
//     switch (role) {
//       case 'User': return 'bg-green-100 text-green-800';
//       case 'Provider': return 'bg-blue-100 text-blue-800';
//       case 'Admin': return 'bg-red-100 text-red-800';
//       case 'Driver': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">Website Workflow Visualization</h1>

//         <div className="grid grid-cols-3 gap-8">
//           {/* Provider Section */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ type: 'spring', stiffness: 100 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <FaCarSide className="text-blue-500 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold">Provider</h2>
//             </div>
//             <button 
//               className="btn btn-primary w-full mb-4"
//               onClick={addCar}
//             >
//               Add New Car
//             </button>
//             <h3 className="font-medium mb-2">My Vehicles</h3>
//             <AnimatePresence>
//               {cars.map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-blue-50 p-2 rounded-lg mb-2"
//                 >
//                   {car.name} - {car.status}
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <h3 className="font-medium mt-4">Wallet: ৳ {walletBalance}</h3>
//           </motion.div>

//           {/* Admin Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <FaUserShield className="text-red-500 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold">Admin</h2>
//             </div>
//             <h3 className="font-medium mb-2">Pending Requests</h3>
//             <AnimatePresence>
//               {cars.filter(car => car.status === 'pending').map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-red-50 p-2 rounded-lg mb-2 flex justify-between items-center"
//                 >
//                   <span>{car.name}</span>
//                   <button 
//                     className="btn btn-success btn-sm"
//                     onClick={() => approveCar(car.id)}
//                   >
//                     Approve
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <button 
//               className="btn btn-danger w-full mt-4"
//               onClick={() => setShowUserManagement(true)}
//             >
//               Manage Users
//             </button>
//           </motion.div>

//           {/* User Section */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ type: 'spring', stiffness: 100 }}
//             className="bg-white p-6 rounded-lg shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <FaUsers className="text-green-500 text-2xl mr-2" />
//               <h2 className="text-xl font-semibold">User</h2>
//             </div>
//             <input 
//               type="text" 
//               placeholder="Filter by name" 
//               value={filter} 
//               onChange={e => setFilter(e.target.value)}
//               className="w-full p-2 mb-4 border rounded"
//             />
//             <h3 className="font-medium mb-2">Available Cars</h3>
//             <AnimatePresence>
//               {availableCars.map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center"
//                 >
//                   <span>{car.name}</span>
//                   <button 
//                     className="btn btn-success btn-sm"
//                     onClick={() => rentCar(car.id)}
//                   >
//                     Rent
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <h3 className="font-medium mt-4 mb-2">My Rentals</h3>
//             <AnimatePresence>
//               {cars.filter(car => car.status === 'rented' && car.renterId === 'user1').map(car => (
//                 <motion.div
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center"
//                 >
//                   <span>{car.name}</span>
//                   <div>
//                     <button 
//                       className="btn btn-danger btn-sm mr-2"
//                       onClick={() => deleteRental(car.id)}
//                     >
//                       Delete
//                     </button>
//                     <button 
//                       className="btn btn-info btn-sm mr-2"
//                       onClick={() => setShowMap(true)}
//                     >
//                       <FaMapMarkerAlt />
//                     </button>
//                     <button 
//                       className="btn btn-info btn-sm"
//                       onClick={() => setShowChat(true)}
//                     >
//                       <FaComment />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         {/* User Management Modal */}
//         {showUserManagement && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={() => setShowUserManagement(false)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg w-96"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               onClick={e => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium">Manage Users</h3>
//                 <button 
//                   onClick={() => setShowUserManagement(false)} 
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//               <AnimatePresence>
//                 {users.map(user => (
//                   <motion.div
//                     key={user.id}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="p-2 hover:bg-gray-100 rounded"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <FaUser className="text-gray-500 mr-2" />
//                         <span>{user.name}</span>
//                         <span className={`ml-2 px-2 py-1 rounded ${getRoleBadgeClass(user.role)}`}>
//                           {user.role}
//                         </span>
//                       </div>
//                       <div>
//                         <select
//                           value={user.role}
//                           onChange={e => {
//                             const newRole = e.target.value;
//                             setUsers(prevUsers => prevUsers.map(u => 
//                               u.id === user.id ? { ...u, role: newRole } : u
//                             ));
//                           }}
//                           className="border rounded p-1 mr-2"
//                         >
//                           <option value="User">User</option>
//                           <option value="Provider">Provider</option>
//                           <option value="Admin">Admin</option>
//                           <option value="Driver">Driver</option>
//                         </select>
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() => setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id))}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Location Tracking Modal */}
//         {showMap && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={() => setShowMap(false)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg relative"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//             >
//               <h3 className="text-lg font-medium mb-4">Track Location</h3>
//               <div className="w-64 h-40 bg-gray-200 relative">
//                 <motion.div
//                   className="absolute"
//                   animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                 >
//                   <FaMapMarkerAlt className="text-red-500 text-2xl" />
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Messaging Modal */}
//         {showChat && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={() => setShowChat(false)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//             >
//               <h3 className="text-lg font-medium mb-4">Messages</h3>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-gray-100 p-2 rounded mb-2"
//               >
//                 Hello! Is the car available?
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="bg-blue-100 p-2 rounded"
//               >
//                 Yes, it’s ready for you!
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkflowAnimation;