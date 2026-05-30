// Sidebar.jsx — updated

import { useNavigate, useLocation } from "react-router-dom"; // ← ADD useLocation
import { X, LogOut } from "lucide-react";
// import { logoutUser } from "../actions/userActions"; // ← wire up if you have it

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ← tracks current path

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/", // ← add path to each item
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4V8"
          />
        </svg>
      ),
    },
    {
      id: "transactions",
      label: "Transactions",
      path: "/transactions",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/analytics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "budgets",
      label: "Budgets",
      path: "/budgets",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: (
        <svg
          className="w-5 h-5"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path); // ← navigate by path
    if (window.innerWidth < 1024) onClose(); // close on mobile
  };

  // Derive active item from current URL instead of local state
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path); // ← survives refresh
  };

  const handleLogout = () => {
    // dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200
                    overflow-y-auto transition-all duration-300 z-40 lg:relative lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500
                            rounded-lg flex items-center justify-center text-white font-bold text-xl"
            >
              E
            </div>
            <div className="font-bold text-xl text-gray-900">ExpenseX</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-5 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)} // ← pass path
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive(item.path) // ← use isActive()
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Log Out */}
        <div
          onClick={handleLogout}
          className="p-4 mt-10 border-t border-gray-100 flex items-center gap-3
                     cursor-pointer text-red-600 hover:bg-red-50 rounded-lg mx-3 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log Out</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
