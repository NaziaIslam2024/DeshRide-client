import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  console.log(user);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    // Update only the name if the photo URL is blank
    if (name && !photo) {
      updateUser({ displayName: name });
      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
      }));
      toast.success("Name Updated!", {
        position: "top-left",
        autoClose: 1500,
      });
    }

    // Update only the photo URL if the name is blank
    if (!name && photo) {
      updateUser({ photoURL: photo });
      setUser((prevUser) => ({
        ...prevUser,
        photoURL: photo,
      }));
      toast.success("Photo URL Updated!", {
        position: "top-left",
        autoClose: 1500,
      });
    }

    // Update both if both fields are filled
    if (name && photo) {
      updateUser({ displayName: name, photoURL: photo });
      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
        photoURL: photo,
      }));
      toast.success("Profile Updated!", {
        position: "top-left",
        autoClose: 1500,
      });
    }

    // Clear the input fields after updating
    e.target.name.value = "";
    e.target.photo.value = "";
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Update Your Information
        </h1>
        <form onSubmit={handleUpdate}>
          {/* Name Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              defaultValue={user?.displayName}
            />
          </div>

          {/* Photo URL Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Photo Link</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
              defaultValue={user?.photoURL}
            />
          </div>

          {/* Update Button */}
          <button className="btn btn-primary w-full mb-4">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
