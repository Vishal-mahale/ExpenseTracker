import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../actions/userActions";

const EyeIcon = ({ show }) => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {show ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    )}
  </svg>
);

const PasswordField = ({
  label,
  name,
  show,
  placeholder,
  value,
  onChange,
  onToggle,
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label}
    </label>

    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm
                   focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <EyeIcon show={show} />
      </button>
    </div>
  </div>
);

const ResetPassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const [showPw, setShowPw] = useState({
    current: false,
    newPw: false,
    confirm: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    dispatch(updatePassword(form));
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          label="Current Password"
          name="currentPassword"
          show={showPw.current}
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          onToggle={() =>
            setShowPw((prev) => ({
              ...prev,
              current: !prev.current,
            }))
          }
        />

        <PasswordField
          label="New Password"
          name="newPassword"
          show={showPw.newPw}
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          onToggle={() =>
            setShowPw((prev) => ({
              ...prev,
              newPw: !prev.newPw,
            }))
          }
        />

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          show={showPw.confirm}
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          onToggle={() =>
            setShowPw((prev) => ({
              ...prev,
              confirm: !prev.confirm,
            }))
          }
        />

        <button
          type="submit"
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl
                       font-semibold text-sm transition-colors shadow-md shadow-purple-200"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
