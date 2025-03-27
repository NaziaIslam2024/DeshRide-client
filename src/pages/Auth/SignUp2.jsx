import React, { useState } from 'react';

const SignUp2 = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'normal', // default role
        licenseNumber: '', // for drivers
        carDetails: '', // for car providers
        drivesOwnCar: false // for car providers who drive their own cars
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        
        // Role-specific validations
        if (formData.role === 'driver' && !formData.licenseNumber) {
            newErrors.licenseNumber = 'License number is required for drivers';
        }
        if ((formData.role === 'carProvider' || formData.role === 'carProviderDriver') && !formData.carDetails) {
            newErrors.carDetails = 'Car details are required for car providers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            // Here you would typically send the data to your backend
            console.log('Form data submitted:', formData);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                alert('Registration successful!');
            }, 1500);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Information */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border'}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border'}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border'}`}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border'}`}
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border'}`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Role Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Account Type</label>
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="normal"
                                name="role"
                                value="normal"
                                checked={formData.role === 'normal'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="normal" className="ml-2 block text-sm text-gray-700">Normal User</label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="driver"
                                name="role"
                                value="driver"
                                checked={formData.role === 'driver'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="driver" className="ml-2 block text-sm text-gray-700">Driver</label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="carProvider"
                                name="role"
                                value="carProvider"
                                checked={formData.role === 'carProvider'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="carProvider" className="ml-2 block text-sm text-gray-700">Car Provider</label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="carProviderDriver"
                                name="role"
                                value="carProviderDriver"
                                checked={formData.role === 'carProviderDriver'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="carProviderDriver" className="ml-2 block text-sm text-gray-700">Car Provider (who drives own car)</label>
                        </div>
                    </div>
                </div>

                {/* Driver-specific fields */}
                {(formData.role === 'driver' || formData.role === 'carProviderDriver') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Driver's License Number</label>
                        <input
                            type="text"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.licenseNumber ? 'border-red-500' : 'border'}`}
                        />
                        {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
                    </div>
                )}

                {/* Car Provider-specific fields */}
                {(formData.role === 'carProvider' || formData.role === 'carProviderDriver') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Car Details</label>
                        <textarea
                            name="carDetails"
                            value={formData.carDetails}
                            onChange={handleChange}
                            rows="3"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.carDetails ? 'border-red-500' : 'border'}`}
                            placeholder="Make, model, year, color, license plate, etc."
                        ></textarea>
                        {errors.carDetails && <p className="mt-1 text-sm text-red-600">{errors.carDetails}</p>}
                    </div>
                )}

                {/* Car Provider who drives own car */}
                {formData.role === 'carProviderDriver' && (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="drivesOwnCar"
                            name="drivesOwnCar"
                            checked={formData.drivesOwnCar}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="drivesOwnCar" className="ml-2 block text-sm text-gray-700">I drive my own car</label>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp2;