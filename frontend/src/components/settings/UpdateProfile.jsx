import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  

  const [form, setForm] = useState({
    name:   user?.name  || "",
    email:  user?.email || "",
    phone:  user?.phone || "",
    avatar: null,
  });
  const [preview, setPreview] = useState(user?.profilePic?.url || null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, avatar: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProfile(form))
    console.log("Update profile", form);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
        <p className="text-sm text-gray-500 mt-1">Update your personal details</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-4 border-purple-200">
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-purple-600">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>
          <label
            htmlFor="avatar"
            className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 rounded-full flex items-center
                       justify-center cursor-pointer hover:bg-purple-700 transition-colors shadow-md"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414a2 2 0 01.586-1.414z" />
            </svg>
            <input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </label>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">{user?.name || "Your Name"}</p>
          <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
          <p className="text-xs text-purple-500 mt-1">Click pencil to change photo</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm
                       focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl
                       font-semibold text-sm transition-colors shadow-md shadow-purple-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;