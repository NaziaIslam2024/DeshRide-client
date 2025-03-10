import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { GrGoogle } from "react-icons/gr";
import GoogleLogin from "./Login/GoogleLogin";

const Register = () => {
  const navigate = useNavigate();
  const { createNewUser, setUser, updateUser } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  // sign up using mail
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();

    // get the data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    // Validate password
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include an uppercase and a lowercase letter."
      );
      return;
    }

    // Clear any previous error if validation passes
    setError("");

    // create user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Congratulations! Successfully created a new account", {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        // Update user profile using updateUser
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to create account. Please try again."); // Handle user creation error
      });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="card border bg-base-100 w-full max-w-lg shrink-0 shadow-lg p-10">
          <h2 className="text-2xl font-semibold text-center">
            Register your account
          </h2>
          <form onSubmit={handleSubmit} className="card-body pb-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo-url"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password input with validation */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {passwordVisible ? (
                    <IoIosEye size={24} />
                  ) : (
                    <IoIosEyeOff size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Show validation error */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="form-control mt-6">
              <button className="btn btn-neutral">Register</button>
            </div>
          </form>

          {/*  */}
          <GoogleLogin setError={setError}></GoogleLogin>

          {/*  */}

          <p className="text-center font-semibold">
            Already Have An Account ?{" "}
            <Link className="text-red-500" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
