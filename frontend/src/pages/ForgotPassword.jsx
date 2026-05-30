import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.forgotPassword
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* HEADING */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email to receive reset link
          </p>
        </div>

        {/* SUCCESS MESSAGE
        {message && (
          <div className="mb-4 rounded-xl bg-green-100 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )} */}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl py-3 font-semibold text-white transition ${
              loading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
