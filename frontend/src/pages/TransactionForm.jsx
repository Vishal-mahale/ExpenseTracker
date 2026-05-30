// components/transactions/TransactionForm.jsx
import { useState, useEffect } from "react";
import {
  CATEGORY_MAP,
  CATEGORIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
  CATEGORY_ICONS,
} from "../constants/transactionConstants";

const initialState = {
  title: "",
  amount: "",
  transactionType: "expense",
  category: "",
  subCategory: "",
  paymentMethod: "Cash",
  date: new Date().toISOString().split("T")[0],
  description: "",
  tags: "",
};

const TransactionForm = ({ onSubmit, onClose, loading, editData }) => {
  const [form, setForm] = useState(initialState);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        amount: editData.amount || "",
        transactionType: editData.transactionType || "expense",
        category: editData.category || "",
        subCategory: editData.subCategory || "",
        paymentMethod: editData.paymentMethod || "Cash",
        date: editData.date
          ? editData.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
        description: editData.description || "",
        tags: editData.tags ? editData.tags.join(", ") : "",
      });
      if (editData.category) {
        setSubCategories(CATEGORY_MAP[editData.category] || []);
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      setSubCategories(CATEGORY_MAP[value] || []);
      setForm((prev) => ({ ...prev, category: value, subCategory: "" }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.amount || Number(form.amount) <= 0)
      newErrors.amount = "Enter a valid amount";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.subCategory) newErrors.subCategory = "Sub-category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      amount: Number(form.amount),
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      date: new Date(form.date).toISOString(),
    };
    onSubmit(payload);
  };

  const inputCls = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400
    ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden
                      max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {editData ? "Edit Transaction" : "New Transaction"}
            </h2>
            <p className="text-xs text-gray-900 mt-0.5">
              {editData
                ? "Update the details below"
                : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
          <div className="px-6 py-5 space-y-4">
            {/* Transaction Type Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200">
              {TRANSACTION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, transactionType: type }))
                  }
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all capitalize
                    ${
                      form.transactionType === type
                        ? type === "income"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                >
                  {type === "income" ? "📈 Income" : "📉 Expense"}
                </button>
              ))}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Grocery shopping"
                className={inputCls("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                Amount (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`${inputCls("amount")} pl-8`}
                />
              </div>
              {errors.amount && (
                <p className="text-red-700 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Category & SubCategory */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputCls("category")}
                >
                  <option value="">Select...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_ICONS[cat]} {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-700 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                  Sub-Category *
                </label>
                <select
                  name="subCategory"
                  value={form.subCategory}
                  onChange={handleChange}
                  disabled={!form.category}
                  className={`${inputCls("subCategory")} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <option value="">Select...</option>
                  {subCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.subCategory && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.subCategory}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method & Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className={inputCls("paymentMethod")}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputCls("date")}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                placeholder="Optional notes..."
                className={`${inputCls("description")} resize-none`}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1.5 uppercase tracking-wide">
                Tags{" "}
                <span className="normal-case text-gray-400">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. weekend, personal, urgent"
                className={inputCls("tags")}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200
                         text-gray-600 text-sm font-medium hover:bg-gray-50
                        transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700
                         text-white text-sm font-semibold transition-colors
                         disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Saving...
                </>
              ) : editData ? (
                "Update Transaction"
              ) : (
                "Add Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
