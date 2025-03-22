import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../providers/AuthProvider';

const AddCar = () => {
    // const {user} = useAuth();
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    return (
        <div className='w-11/12 mx-auto p-5 text-center items-center'>
            <h2 className='text-2xl'>Do you want to invest a Car? Please provide these information.</h2>
            <h4 className='text-base'>**You have to upload document's scanned copy**</h4>

            <form onSubmit={handleSubmit(onSubmit)} className='bg-accent-light-100 p-5'>
                {/* <input type="email" defaultValue={user.email} readOnly/> */}
                <input {...register("firstName")} />
                <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddCar;