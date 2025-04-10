import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_Image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCar = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [insurancePreview, setInsurancePreview] = useState(null);
  const [registrationPreview, setRegistrationPreview] = useState(null);
  const [permitPreview, setPermitPreview] = useState(null);
  const [taxTokenPreview, setTaxTokenPreview] = useState(null);
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("model", data.model);
      formData.append("price", data.price);
      formData.append("type", data.type);
      formData.append("transmission", data.transmission);
      formData.append("fuelType", data.fuelType);
      formData.append("seats", data.seats);
      formData.append("features", data.features);
      formData.append("carLocation", data.carLocation);
      formData.append("addedBy", user.displayName);
      formData.append("ownerEmail", user.email);
      formData.append("mileage", data.mileage);
      formData.append("yearOfManufacture", data.yearOfManufacture);
      formData.append("color", data.color);
      formData.append("image", data.image[0]);
      formData.append("insuranceDocs", data.insuranceDocs[0]);
      formData.append("registrationCopy", data.registrationCopy[0]);
      formData.append("roadPermit", data.roadPermit[0]);
      formData.append("taxToken", data.taxToken[0]);
      if (data.VehicleRegistrationNo) formData.append("VehicleRegistrationNo", data.VehicleRegistrationNo);

      const response = await axiosPublic.post("/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Car added successfully!");
      reset();
      setImagePreview(null);
      setInsurancePreview(null);
      setRegistrationPreview(null);
      setPermitPreview(null);
      setTaxTokenPreview(null);
    } catch (error) {
      console.error("Car addition error:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || "Failed to add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-12 p-8 bg-accent-light-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Add a New Car</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Car Name</span></label>
              <input type="text" {...register("name", { required: "Car name is required" })} placeholder="Toyota" className="input input-bordered w-full" />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Model</span></label>
              <input type="text" {...register("model", { required: "Model is required" })} placeholder="Corolla" className="input input-bordered w-full" />
              {errors.model && <span className="text-red-500 text-sm mt-1">{errors.model.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Price per day ($)</span></label>
              <input type="number" step="0.01" {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })} placeholder="50.00" className="input input-bordered w-full" />
              {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Car Type</span></label>
              <select {...register("type", { required: "Car type is required" })} className="select select-bordered w-full">
                <option value="">Select Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Sports">Sports</option>
                <option value="Luxury">Luxury</option>
                <option value="CNG">CNG</option>
                <option value="Ambulance">Ambulance</option>
                <option value="Bus">Bus</option>
                <option value="MiniBus">Mini Bus</option>
                <option value="HIACE">HIACE</option>
              </select>
              {errors.type && <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>}
            </div>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Transmission</span></label>
              <select {...register("transmission", { required: "Transmission is required" })} className="select select-bordered w-full">
                <option value="">Select Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              {errors.transmission && <span className="text-red-500 text-sm mt-1">{errors.transmission.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Fuel Type</span></label>
              <select {...register("fuelType", { required: "Fuel type is required" })} className="select select-bordered w-full">
                <option value="">Select Fuel Type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuelType && <span className="text-red-500 text-sm mt-1">{errors.fuelType.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Number of Seats</span></label>
              <input type="number" {...register("seats", { required: "Seats is required", min: { value: 2, message: "Minimum 2 seats" }, max: { value: 57, message: "Maximum 57 seats" } })} placeholder="4" className="input input-bordered w-full" />
              {errors.seats && <span className="text-red-500 text-sm mt-1">{errors.seats.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Mileage (km)</span></label>
              <input type="number" {...register("mileage", { required: "Mileage is required", min: { value: 0, message: "Mileage must be positive" } })} placeholder="50000" className="input input-bordered w-full" />
              {errors.mileage && <span className="text-red-500 text-sm mt-1">{errors.mileage.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Year of Manufacture</span></label>
              <input type="number" {...register("yearOfManufacture", { required: "Year is required", min: { value: 1900, message: "Year must be after 1900" }, max: { value: new Date().getFullYear(), message: "Year cannot be in future" } })} placeholder="2020" className="input input-bordered w-full" />
              {errors.yearOfManufacture && <span className="text-red-500 text-sm mt-1">{errors.yearOfManufacture.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Color</span></label>
              <input type="text" {...register("color", { required: "Color is required" })} placeholder="Red" className="input input-bordered w-full" />
              {errors.color && <span className="text-red-500 text-sm mt-1">{errors.color.message}</span>}
            </div>
          </div>
        </section>

        {/* Additional Details Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Features (comma separated)</span></label>
              <input type="text" {...register("features", { required: "Features are required" })} placeholder="GPS, Bluetooth, Air Conditioning" className="input input-bordered w-full" />
              {errors.features && <span className="text-red-500 text-sm mt-1">{errors.features.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Car Location</span></label>
              <input type="text" {...register("carLocation", { required: "Location is required" })} placeholder="City or specific address" className="input input-bordered w-full" />
              {errors.carLocation && <span className="text-red-500 text-sm mt-1">{errors.carLocation.message}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Vehicle Registration Number </span></label>
              <input type="text" {...register("VehicleRegistrationNo")} placeholder="VR-12345-ABC" className="input input-bordered w-full" />
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Documents & Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Car Image</span></label>
              <input type="file" {...register("image", { required: "Image is required" })} accept="image/*" onChange={(e) => handleImageChange(e, setImagePreview)} className="file-input file-input-bordered w-full" />
              {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
              {imagePreview && <img src={imagePreview} alt="Car Preview" className="mt-4 max-w-xs rounded-lg shadow-md" />}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Insurance Documents</span></label>
              <input type="file" {...register("insuranceDocs", { required: "Insurance documents are required" })} accept="image/*" onChange={(e) => handleImageChange(e, setInsurancePreview)} className="file-input file-input-bordered w-full" />
              {errors.insuranceDocs && <span className="text-red-500 text-sm mt-1">{errors.insuranceDocs.message}</span>}
              {insurancePreview && <img src={insurancePreview} alt="Insurance Preview" className="mt-4 max-w-xs rounded-lg shadow-md" />}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Vehicle Registration Copy</span></label>
              <input type="file" {...register("registrationCopy", { required: "Registration copy is required" })} accept="image/*" onChange={(e) => handleImageChange(e, setRegistrationPreview)} className="file-input file-input-bordered w-full" />
              {errors.registrationCopy && <span className="text-red-500 text-sm mt-1">{errors.registrationCopy.message}</span>}
              {registrationPreview && <img src={registrationPreview} alt="Registration Preview" className="mt-4 max-w-xs rounded-lg shadow-md" />}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Road Permit</span></label>
              <input type="file" {...register("roadPermit", { required: "Road permit is required" })} accept="image/*" onChange={(e) => handleImageChange(e, setPermitPreview)} className="file-input file-input-bordered w-full" />
              {errors.roadPermit && <span className="text-red-500 text-sm mt-1">{errors.roadPermit.message}</span>}
              {permitPreview && <img src={permitPreview} alt="Permit Preview" className="mt-4 max-w-xs rounded-lg shadow-md" />}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Tax Token</span></label>
              <input type="file" {...register("taxToken", { required: "Tax token is required" })} accept="image/*" onChange={(e) => handleImageChange(e, setTaxTokenPreview)} className="file-input file-input-bordered w-full" />
              {errors.taxToken && <span className="text-red-500 text-sm mt-1">{errors.taxToken.message}</span>}
              {taxTokenPreview && <img src={taxTokenPreview} alt="Tax Token Preview" className="mt-4 max-w-xs rounded-lg shadow-md" />}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-full max-w-xs mx-auto"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Add Car"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;