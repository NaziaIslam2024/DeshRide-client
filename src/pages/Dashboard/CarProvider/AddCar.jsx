import React, { useState } from 'react';
import clsx from "clsx";
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, UserCheck, Eye, EyeOff } from "lucide-react";
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_Image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddCar = () => {
    const [isChecked, setIsChecked] = useState(false);
    const axiosPublic = "http://localhost:5001";
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const imageFields = ["VehicleRegImg", "VehicleTaxImg", "vehicleInsurance", "FitnessCertificate", "drivingLicenseImg"];
            const uploadedImages = {};

            for (const field of imageFields) {
                if (data[field]?.[0]) {
                    const formData = new FormData();
                    formData.append("image", data[field][0]);

                    const res = await fetch(image_hosting_api, {
                        method: "POST",
                        body: formData,
                    });

                    const result = await res.json();
                    if (result.success) {
                        uploadedImages[field] = result.data.url;
                    }
                }
            }
            const formDataWithUrls = {
                fullName: data.fullName,
                email: data.email,
                nid: data.nid,
                // licenseNo: data.licenseNo,
                VehicleRegistrationNo: data.VehicleRegistrationNo,
                vehicleTaxToken: data.vehicleTaxToken,
                // licenseImageUrl: uploadedImages["drivingLicenseImg"] || "",
                vehicleRegImageUrl: uploadedImages["VehicleRegImg"] || "",
                vehicleTaxImageUrl: uploadedImages["VehicleTaxImg"] || "",
                vehicleInsuranceImageUrl: uploadedImages["vehicleInsurance"] || "",
                fitnessCertificateImageUrl: uploadedImages["FitnessCertificate"] || "",
            };

            console.log("Final Form Data: ", formDataWithUrls);

        } catch (error) {
            console.error("Image upload failed:", error);
        }
    }

    return (
        <div className='w-9/12 mx-auto p-5 text-center items-center bg-accent-light-100 rounded-lg mt-10'>
            <h2 className='text-2xl text-accent-dark-200'>Do you want to invest a Car? Please provide these information.</h2>
            <h4 className='text-base mb-8'>**You have to upload document's scanned copy**</h4>

            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}>
                {/* <input type="email" defaultValue={user.email} readOnly/> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            {...register("fullName", { required: true })}
                            type="text"
                            placeholder="Full Name"
                            className={clsx(
                                "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                errors.fullName
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-accent-dark-300 focus:border-accent-light-500"
                            )}
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            value={user?.email}
                            placeholder="Email Address"
                            className={clsx(
                                "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                errors.email
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-accent-dark-300 focus:border-accent-light-500"
                            )}
                        />
                    </div>
                    <div className="relative">
                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            {...register("nid", { required: true })}
                            type="text"
                            placeholder="NID Number"
                            // className="w-full pl-10 pr-3 py-2 text-sm border border-accent-dark-300 rounded-lg focus:border-accent-light-500 focus:outline-none transition-colors"
                            className={clsx(
                                "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                errors.nid
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-accent-dark-300 focus:border-accent-light-500"
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            {...register("VehicleRegistrationNo", { required: true })}
                            type="text"
                            placeholder="Vehicle Registration Number"
                            // className="w-full pl-10 pr-3 py-2 text-sm border border-accent-dark-300 rounded-lg focus:border-accent-light-500 focus:outline-none transition-colors"
                            className={clsx(
                                "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                errors.VehicleRegistrationNo
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-accent-dark-300 focus:border-accent-light-500"
                            )}
                        />
                    </div>
                    <div className="relative">
                        <label className="floating-label">
                            <span className="bg-red-900">Upload Vehicle Registration's Scanned Photo</span>
                            <input
                                {...register("VehicleRegImg", { required: true })}
                                type="file"
                                className={clsx(
                                    "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                    errors.VehicleRegImg
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-accent-dark-300 focus:border-accent-light-500"
                                )}
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            {...register("vehicleTaxToken", { required: true })}
                            type="text"
                            placeholder="Vehicle Tax Token"
                            // className="w-full pl-10 pr-3 py-2 text-sm border border-accent-dark-300 rounded-lg focus:border-accent-light-500 focus:outline-none transition-colors"
                            className={clsx(
                                "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                errors.vehicleTaxToken
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-accent-dark-300 focus:border-accent-light-500"
                            )}
                        />
                    </div>
                    <div className="relative">
                        <label className="floating-label">
                            <span className="bg-red-900">Upload your Vehicle Tax Document's Scanned Photo</span>
                            <input
                                {...register("VehicleTaxImg", { required: true })}
                                type="file"
                                className={clsx(
                                    "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                    errors.VehicleTaxImg
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-accent-dark-300 focus:border-accent-light-500"
                                )}
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="floating-label">
                            <span className="bg-red-900">Upload Vehicle Insurance document's Scanned Photo</span>
                            <input
                                {...register("vehicleInsurance", { required: true })}
                                type="file"
                                placeholder="Upload Vehicle insurance document's Scanned Photo"
                                // className="w-full pl-10 pr-3 py-2 text-sm border border-accent-dark-300 rounded-lg focus:border-accent-light-500 focus:outline-none transition-colors"
                                className={clsx(
                                    "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                    errors.vehicleInsurance
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-accent-dark-300 focus:border-accent-light-500"
                                )}
                            />
                        </label>
                    </div>
                    <div className="relative">
                        <label className="floating-label">
                            <span className="bg-red-900">Upload Vehicle's Fitness Certificate's Scanned Photo</span>
                            <input
                                {...register("FitnessCertificate", { required: true })}
                                type="file"
                                className={clsx(
                                    "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                    errors.FitnessCertificate
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-accent-dark-300 focus:border-accent-light-500"
                                )}
                            />
                        </label>
                    </div>
                </div>
                <label className="fieldset-label">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="checkbox border-accent-dark-300 bg-white checked:bg-green-400 checked:text-accent-dark-300 checked:border-accent-dark-300 " />
                    Do you want to drive your own vehicle?
                </label>
                {isChecked && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                {...register("licenseNo", { required: true })}
                                type="text"
                                placeholder="Driving License Number"
                                // className="w-full pl-10 pr-3 py-2 text-sm border border-accent-dark-300 rounded-lg focus:border-accent-light-500 focus:outline-none transition-colors"
                                className={clsx(
                                    "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                    errors.licenseNo
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-accent-dark-300 focus:border-accent-light-500"
                                )}
                            />
                        </div>
                        <div className="relative">
                            <label className="floating-label">
                                <span className="bg-red-900">Upload your Driving License Photo</span>
                                <input
                                    {...register("drivingLicenseImg", { required: true })}
                                    type="file"
                                    className={clsx(
                                        "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                        errors.drivingLicenseImg
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-accent-dark-300 focus:border-accent-light-500"
                                    )}
                                />
                            </label>
                        </div>
                    </div>
                )}

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-gradient-to-r from-accent-dark-200 to-accent-dark-500 text-white p-2.5 rounded-lg font-medium text-sm hover:from-accent-dark-600 hover:to-accent-dark-700 transition-all shadow-md shadow-blue-200"
                >
                    Add Car/Vehicle
                </motion.button>
            </motion.form>
        </div>
    );
};

export default AddCar;