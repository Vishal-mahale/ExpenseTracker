
export const CREATE_TRANSACTION_REQUEST = "CREATE_TRANSACTION_REQUEST";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const CREATE_TRANSACTION_FAIL    = "CREATE_TRANSACTION_FAIL";
export const CREATE_TRANSACTION_RESET   = "CREATE_TRANSACTION_RESET";

export const GET_ALL_TRANSACTIONS_REQUEST = "GET_ALL_TRANSACTIONS_REQUEST";
export const GET_ALL_TRANSACTIONS_SUCCESS = "GET_ALL_TRANSACTIONS_SUCCESS";
export const GET_ALL_TRANSACTIONS_FAIL    = "GET_ALL_TRANSACTIONS_FAIL";

export const GET_TRANSACTION_DETAIL_REQUEST = "GET_TRANSACTION_DETAIL_REQUEST";
export const GET_TRANSACTION_DETAIL_SUCCESS = "GET_TRANSACTION_DETAIL_SUCCESS";
export const GET_TRANSACTION_DETAIL_FAIL    = "GET_TRANSACTION_DETAIL_FAIL";

export const UPDATE_TRANSACTION_REQUEST = "UPDATE_TRANSACTION_REQUEST";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_FAIL    = "UPDATE_TRANSACTION_FAIL";
export const UPDATE_TRANSACTION_RESET   = "UPDATE_TRANSACTION_RESET";

export const DELETE_TRANSACTION_REQUEST = "DELETE_TRANSACTION_REQUEST";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_FAIL    = "DELETE_TRANSACTION_FAIL";
export const DELETE_TRANSACTION_RESET   = "DELETE_TRANSACTION_RESET";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

// ─── Category & SubCategory Map ──────────────────────────────────────────────
export const CATEGORY_MAP = {
  Income:          ["Salary", "Odd Jobs", "Pension","Bussiness","Pocket Money","Other"],
  "Food/Drinks":   ["Eating Out", "Bar"],
  Shopping:        ["Clothing", "Shoes", "Technology", "Gifts"],
  Transportation:  ["Car", "Fuel", "Insurance"],
  Entertainment:   ["Movies", "Games", "Books"],
  "Home Expense":  ["Rent", "Electricity", "Water", "Internet"],
  Family:          ["Children", "Education"],
  "Health/Sport":  ["Health", "Sport"],
  Pets:            ["Pet Food"],
  Travels:         ["Accommodation", "Transport"],
  Other:           ["Taxes", "Cigarettes", "Debt"],
};


export const CATEGORIES = Object.keys(CATEGORY_MAP);

export const PAYMENT_METHODS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "UPI",
];

export const TRANSACTION_TYPES = ["income", "expense"];

// ─── Category Icons (emoji fallback) ─────────────────────────────────────────

export const CATEGORY_ICONS = {
  Income:         "💰",
  "Food/Drinks":  "🍔",
  Shopping:       "🛍️",
  Transportation: "🚗",
  Entertainment:  "🎬",
  "Home Expense": "🏠",
  Family:         "👨‍👩‍👧",
  "Health/Sport": "🏋️",
  Pets:           "🐾",
  Travels:        "✈️",
  Other:          "📦",
};

// ─── Category Colors (Tailwind-safe) ─────────────────────────────────────────

export const CATEGORY_COLORS = {
  Income:         "#22c55e",
  "Food/Drinks":  "#f97316",
  Shopping:       "#a855f7",
  Transportation: "#3b82f6",
  Entertainment:  "#ec4899",
  "Home Expense": "#14b8a6",
  Family:         "#f59e0b",
  "Health/Sport": "#ef4444",
  Pets:           "#84cc16",
  Travels:        "#06b6d4",
  Other:          "#6b7280",
};
