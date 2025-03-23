import React, { useState } from 'react';
import { Trash2, User, FileText } from 'lucide-react';
import useAuth from '../../../hooks/useAuth'; // Import your auth hook

const CarSelect = () => {
  const { user } = useAuth(); // Get user from auth hook
  const [cars, setCars] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
      model: 'Toyota Camry',
      registrationNo: 'ABC-1234',
      brand: 'Toyota',
      vehicleTaxToken: 'TX-789456',
      nid: '1995123456789',
      // Remove hardcoded userEmail
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753',
      model: 'Honda Civic',
      registrationNo: 'XYZ-5678',
      brand: 'Honda',
      vehicleTaxToken: 'TX-321654',
      nid: '1998987654321',
      // Remove hardcoded userEmail
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
        model: 'Ford Mustang',
        registrationNo: 'MUS-2023',
        brand: 'Ford',
        vehicleTaxToken: 'TX-987321',
        nid: '2000456789123'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
        model: 'Tesla Model S',
        registrationNo: 'TES-001',
        brand: 'Tesla',
        vehicleTaxToken: 'TX-654987',
        nid: '2001123456789'
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
        model: 'Porsche 911',
        registrationNo: 'POR-911',
        brand: 'Porsche',
        vehicleTaxToken: 'TX-147258',
        nid: '1999567812345'
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
        model: 'BMW X5',
        registrationNo: 'BMW-2023',
        brand: 'BMW',
        vehicleTaxToken: 'TX-369258',
        nid: '1998345678912'
      }
  ]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Managed Vehicles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image and delete button */}
            <div className="relative">
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => {
                  setSelectedCar(car);
                  setShowModal(true);
                }}
                className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {car.model}
              </h2>
              
              {/* User Email from auth */}
              <div className="flex items-center mb-4 gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.email}</span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-500">Registration No</label>
                  <p className="font-medium">{car.registrationNo}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Brand</label>
                  <p className="font-medium">{car.brand}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Tax Token</label>
                  <p className="font-medium">{car.vehicleTaxToken}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">NID Number</label>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <p className="font-medium">{car.nid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal remains same */}
    </div>
  );
};

export default CarSelect;