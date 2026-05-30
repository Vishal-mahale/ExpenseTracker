// Login.jsx

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../actions/userActions.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
    setFormData({ email: "", password: "" });
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-violet-600 to-purple-800 items-center justify-center p-10">
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back 👋</h1>

          <p className="mt-6 text-lg text-violet-100">
            Access your expense tracker dashboard and monitor your financial
            growth.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#F5F7FB] p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>

            <p className="mt-2 text-gray-500">
              Continue managing your finances
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-violet-600 hover:underline"
                onClick={() => navigate("/password/forgot")}
              >
                Forgot Password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Login
            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <span className="cursor-pointer font-semibold text-violet-600 hover:underline">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
