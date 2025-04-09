/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { GrGoogle } from "react-icons/gr";
// import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const { signInUser, setUser, setLoading, resetPassword } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // password reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    // password reset function here
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        toast.error("Failed to send password reset email.", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
      });
  };

  // Sign in function using email and password
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // setLoginMail(email);

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        e.target.reset();
        setError(""); // Clear error on successful login
        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        }); // Success toast

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again."); // Set error message
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        }); // Error toast
        console.error("ERROR", error.message);
        e.target.password.value = "";
      });
  };

  return (
    <>
      <div className="min-h-screen mt-14 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-blue-500/90 mix-blend-multiply" />
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt="Office workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Welcome Back
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-100"
                >
                  Sign in to continue your journey
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-1/2 p-8 md:p-12"
          >
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Login to your account
              </h2>

              {/* //? */}
              <div className="mb-4 text-center space-x-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setEmail("consumer@deshrider.com");
                    setPassword("consumer@123DeshRider");
                  }}
                >
                  Consumer Login
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setEmail("car_investor_with_driver@deshrider.com");
                    setPassword("car_investor_with_driver");
                  }}
                >
                  Driver Login
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setEmail("admin@deshrider.com");
                    setPassword("123DeshRider");
                  }}
                >
                  Admin Login
                </button>
              </div>
              {/* //? */}

              <form onSubmit={handleLogin} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                    required
                    //
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200"
                    >
                      {passwordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <p
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    Forgot password?
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                  type="submit"
                >
                  Sign in
                </motion.button>

                <GoogleLogin setError={setError}></GoogleLogin>
              </form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center text-sm text-gray-600"
              >
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* //* Modal for the reset password  */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-lg">Reset Your Password</h3>
          {/*  */}
          <form
            className="join mt-6 flex justify-center items-center"
            onSubmit={handlePasswordReset}
          >
            <div>
              <label className="input validator join-item">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <button
              className="btn btn-neutral join-item"
              // onSubmit={(e) => handlePasswordReset(e)}
              type="submit"
            >
              Reset
            </button>
          </form>
          {/*  */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Login;
