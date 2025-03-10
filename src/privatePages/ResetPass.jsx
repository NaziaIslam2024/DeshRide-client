/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router";
import { toast } from "react-toastify";

const ResetPass = () => {
  const { resetPassword, logOut, user } = useContext(AuthContext);
  const loginMail = user?.email;

  const handleReset = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    resetPassword(email);
    toast.success("Sent Email !", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Reset Your Password
        </h1>
        <form onSubmit={handleReset}>
          {/* Email Input */}
          <div className="form-control mb-4">
            <label htmlFor="email" className="label">
              <span className="label-text">Enter your email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              defaultValue={loginMail}
              required
            />
          </div>

          {/* <Link to="/auth/login"> */}
          <button
            // onClick={() => {
            //   logOut();
            //   window.open(
            //     "https://mail.google.com/mail/u/0/#inbox",
            //     "_blank"
            //   );
            // }}
            className="btn btn-primary w-full mb-4"
          >
            Reset Password
          </button>
          {/* </Link> */}
        </form>
        {/* Back to Home */}
        <div className="text-center">
          <Link to={-1}>
            <p className="text-sm text-gray-500 hover:text-gray-700 underline">
              Go Back
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
