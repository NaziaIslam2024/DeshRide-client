import React from 'react';
import clsx from "clsx";
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, UserCheck, Eye, EyeOff } from "lucide-react";
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_Image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddCar = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
   
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        });
        console.log(res.data);
    }

    return (
        <div className='w-11/12 mx-auto p-5 text-center items-center bg-accent-light-100 rounded-lg mt-10'>
            <h2 className='text-2xl text-accent-dark-200'>Do you want to invest a Car? Please provide these information.</h2>
            <h4 className='text-base mb-8'>**You have to upload document's scanned copy**</h4>

            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}>
                {/* <input type="email" defaultValue={user.email} readOnly/> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            placeholder="Upload your Driving License"
                            className={clsx(
                                "w-full pl-10 pr-3 py-2 text-sm border rounded-lg transition-colors focus:outline-none",
                                errors.image
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-accent-dark-300 focus:border-accent-light-500"
                            )}
                        />
                        {/* {errors.drivingLicense && <span className="text-sm text-red-500">photo url field is required</span>} */}
                    </div>
                </div>
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