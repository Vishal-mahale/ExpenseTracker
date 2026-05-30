// components/transactions/TransactionFilters.jsx
import { useState } from "react";
import {
  CATEGORIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
} from "../constants/transactionConstants";

const TransactionFilters = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    transactionType: "",
    category: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApply = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const empty = {
      transactionType: "",
      category: "",
      paymentMethod: "",
      startDate: "",
      endDate: "",
    };
    setFilters(empty);
    onReset();
    setIsOpen(false);
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 
                   bg-white text-gray-700 hover:border-purple-400
                   transition-all text-sm font-medium shadow-sm"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute right-0 top-12 z-30 w-80 bg-white rounded-2xl shadow-2xl
                        border border-gray-100 p-5 space-y-4"
        >
          <h3 className="font-semibold text-gray-800 text-sm">
            Filter Transactions
          </h3>

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1">
              Type
            </label>
            <select
              name="transactionType"
              value={filters.transactionType}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200
                         bg-gray-50 text-gray-800 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Types</option>
              {TRANSACTION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200
                         bg-gray-50 text-gray-800 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-medium text-gray-800 mb-1">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={filters.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-200
                         bg-gray-50 text-gray-800 text-sm
                         focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Methods</option>
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                From
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200
                           bg-gray-50 text-gray-800 text-sm
                           focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">
                To
              </label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200
                           bg-gray-50 text-gray-800 text-sm
                           focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleReset}
              className="flex-1 py-2 rounded-lg border border-gray-200 
                         text-gray-800 text-sm hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
