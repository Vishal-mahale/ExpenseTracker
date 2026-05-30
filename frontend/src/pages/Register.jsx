import { useState, useEffect } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../actions/userActions.js";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user,
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      const file = files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      setFormData({
        ...formData,
        profilePic: file,
      });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("email", formData.email.toLowerCase().trim());
    data.append("password", formData.password);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }
    dispatch(registerUser(data));
  };

  // HANDLE AUTH + ERRORS
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  // CLEANUP IMAGE PREVIEW
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-8">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 to-purple-800 items-center justify-center p-10">
          <div className="max-w-sm text-white">
            <h1 className="text-4xl font-bold leading-tight">
              Track Your Expenses Smartly
            </h1>

            <p className="mt-5 text-base leading-7 text-violet-100">
              Manage income, expenses, savings, and financial goals all in one
              place.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-sm">
            {/* HEADING */}
            <div className="mb-7 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Start managing your finances today
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* PROFILE PIC */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-4 transition hover:border-violet-500">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="h-5 w-5 text-violet-600" />

                      <span className="text-sm text-gray-600">
                        Upload Picture
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>

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
                  required
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
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
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
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
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* LOGIN */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
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
      </div>
    </div>
  );
};

export default Register;
