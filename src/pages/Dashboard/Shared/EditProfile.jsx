import React, { memo, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const EditProfile = memo(() => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user?.email) return;

        const response = await axiosPublic.get(`/users/getUser/${user.email}`);
        const data = response.data;

        setFormData({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          emergencyContact: data.emergencyContact || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfileData();
  }, [user?.email, axiosPublic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Form:", formData);
    const result = await axiosPublic.put(`/users/updateUser/${user.email}`, formData);
  };

  if (loading) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="bg-white min-h-full py-5 flex justify-center items-center">
      <div className="card px-5 bg-base-100 w-full max-w-sm shrink-0 rounded-2xl shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label className="fieldset-label text-lg">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="input"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <label className="fieldset-label text-lg">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="input"
              placeholder="Phone No."
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <label className="fieldset-label text-lg">Address</label>
            <input
              type="text"
              name="address"
              className="input"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
            />

            <label className="fieldset-label text-lg">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              className="input"
              placeholder="Enter Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />

            <button type="submit" className="btn bg-primary-light-600 text-white mt-4 rounded-xl">
              Update
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
});

export default EditProfile;
