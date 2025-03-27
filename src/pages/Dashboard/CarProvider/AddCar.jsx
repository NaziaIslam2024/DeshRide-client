import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_Image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCar = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            // Create FormData for multipart upload
            const formData = new FormData();
            
            // Append all car details to FormData
            formData.append('name', data.name);
            formData.append('model', data.model);
            formData.append('price', data.price);
            formData.append('type', data.type);
            formData.append('transmission', data.transmission);
            formData.append('fuelType', data.fuelType);
            formData.append('seats', data.seats);
            formData.append('features', data.features);
            
            // Append registration number if provided
            if (data.VehicleRegistrationNo) {
                formData.append('VehicleRegistrationNo', data.VehicleRegistrationNo);
            }
            
            // Append image file
            const imageFile = data.image[0];
            formData.append('image', imageFile);
    
            // Send request to backend
            const response = await axiosPublic.post('/cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Show success toast
            toast.success('Car added successfully!');
            
            // Reset form and image preview
            reset();
            setImagePreview(null);
        } catch (error) {
            // Show detailed error toast
            console.error('Car addition error:', error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || 'Failed to add car. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='w-9/12 mx-auto p-5 text-center items-center bg-accent-light-100 rounded-lg mt-10'>
            <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Car Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Car Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: "Car name is required" })}
                            placeholder="Toyota"
                            className="input input-bordered w-full"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    
                    {/* Car Model */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Model</span>
                        </label>
                        <input
                            type="text"
                            {...register("model", { required: "Model is required" })}
                            placeholder="Corolla"
                            className="input input-bordered w-full"
                        />
                        {errors.model && <span className="text-red-500 text-sm">{errors.model.message}</span>}
                    </div>
                    
                    {/* Price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price per day ($)</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("price", { 
                                required: "Price is required",
                                min: { value: 0, message: "Price must be positive" }
                            })}
                            placeholder="50.00"
                            className="input input-bordered w-full"
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>
                    
                    {/* Car Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Car Type</span>
                        </label>
                        <select
                            {...register("type", { required: "Car type is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Type</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Truck">Truck</option>
                            <option value="Sports">Sports</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                        {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                    </div>
                    
                    {/* Transmission */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Transmission</span>
                        </label>
                        <select
                            {...register("transmission", { required: "Transmission is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                        {errors.transmission && <span className="text-red-500 text-sm">{errors.transmission.message}</span>}
                    </div>
                    
                    {/* Fuel Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Fuel Type</span>
                        </label>
                        <select
                            {...register("fuelType", { required: "Fuel type is required" })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Fuel Type</option>
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        {errors.fuelType && <span className="text-red-500 text-sm">{errors.fuelType.message}</span>}
                    </div>
                    
                    {/* Seats */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Number of Seats</span>
                        </label>
                        <input
                            type="number"
                            {...register("seats", { 
                                required: "Seats is required",
                                min: { value: 2, message: "Minimum 2 seats" },
                                max: { value: 8, message: "Maximum 8 seats" }
                            })}
                            placeholder="4"
                            className="input input-bordered w-full"
                        />
                        {errors.seats && <span className="text-red-500 text-sm">{errors.seats.message}</span>}
                    </div>
                    
                    {/* Features */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Features (comma separated)</span>
                        </label>
                        <input
                            type="text"
                            {...register("features", { required: "Features are required" })}
                            placeholder="GPS, Bluetooth, Air Conditioning"
                            className="input input-bordered w-full"
                        />
                        {errors.features && <span className="text-red-500 text-sm">{errors.features.message}</span>}
                    </div>
                </div>
                
                {/* Image Upload */}
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Car Image</span>
                    </label>
                    <input
                        type="file"
                        {...register("image", { required: "Image is required" })}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                    
                    {imagePreview && (
                        <div className="mt-4">
                            <img 
                                src={imagePreview} 
                                alt="Car Preview" 
                                className="max-w-xs mx-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>
                {/* Optional Vehicle Registration Number */}
<div className="form-control">
    <label className="label">
        <span className="label-text">Vehicle Registration Number (Optional)</span>
    </label>
    <input
        type="text"
        {...register("VehicleRegistrationNo")}
        placeholder="VR-12345-ABC"
        className="input input-bordered w-full"
    />
</div>
                {/* Submit Button */}
                <div className="form-control mt-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            'Add Car'
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;