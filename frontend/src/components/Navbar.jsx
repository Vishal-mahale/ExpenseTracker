import React, { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/userActions.js";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ onMenuToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login")
  };

  return (
    <nav className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-30 shadow-sm">
      {/* Hamburger Menu (Mobile Only) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Logo (Mobile Only) */}
      <div className="lg:hidden font-bold text-lg text-gray-900">ExpenseX</div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-2 md:gap-2 bg-slate-100 p-2 rounded-lg">
        {/* Theme Toggle */}
        <button className="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <img
              src={
                user?.profilePic?.url ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              }
              alt="Profile"
              className="w-8 h-8 rounded-md"
            />
            <div className="hidden sm:flex flex-col items-start">
              <span className="font-semibold text-sm text-gray-900">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500">User</span>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-600 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-semibold text-sm text-gray-900">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{user?.email}</div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-600 text-sm transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>User Profile</span>
                </div>

                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-600 text-sm transition-colors" onClick={()=> navigate("/account/settings")}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                  </svg>
                  <span>Settings</span>
                </div>

                <div className="h-px bg-gray-100 my-2"></div>

                <div className="px-4 py-3 hover:bg-red-50 cursor-pointer flex items-center gap-3 text-red-600 text-sm transition-colors">
                  <button
                    onClick={handleLogOut}
                    className="w-full px-4 py-3 hover:bg-red-50 flex items-center gap-3 text-red-600 text-sm transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
