// pages/TransactionsPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  clearErrors,
} from "../actions/transactionActions";

import {
  CREATE_TRANSACTION_RESET,
  UPDATE_TRANSACTION_RESET,
  DELETE_TRANSACTION_RESET,
} from "../constants/transactionConstants";

import TransactionCard from "../pages/TransactionCard.jsx";
import TransactionForm from "../pages/TransactionForm.jsx";
import TransactionFilters from "../pages/TransactionFilters.jsx";
import DeleteConfirmModal from "../pages/DeleteConfirmModal.jsx";

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ label, amount, icon, color }) => (
  <div
    className={`flex-1 min-w-[140px] rounded-2xl p-4 ${color} flex items-center gap-3`}
  >
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-xs font-medium opacity-70">{label}</p>
      <p className="text-lg font-bold">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(amount)}
      </p>
    </div>
  </div>
);

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-4 py-3.5 bg-white rounded-2xl border border-gray-100 animate-pulse">
    <div className="w-11 h-11 rounded-xl bg-gray-200  flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3.5 bg-gray-200  rounded w-1/3" />
      <div className="h-2.5 bg-gray-100  rounded w-1/2" />
    </div>
    <div className="space-y-1 text-right">
      <div className="h-3.5 bg-gray-200  rounded w-16" />
      <div className="h-2.5 bg-gray-100  rounded w-12" />
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const TransactionsPage = () => {
  const dispatch = useDispatch();
  const {
    transactions = [],
    loading,
    pages,
    page: currentPage,
  } = useSelector((state) => state.transactions);

  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = useSelector((state) => state.createTransaction);

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.updateTransaction);

  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteTransaction);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch on mount / filter / page change ───────────────────────────────
  const fetchTransactions = useCallback(() => {
    dispatch(getAllTransactions({ ...activeFilters, page, limit: 10 }));
  }, [dispatch, activeFilters, page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // ─── Handle create success ───────────────────────────────────────────────
  useEffect(() => {
    if (createSuccess) {
      showToast("Transaction added successfully! 🎉", "success");
      setShowForm(false);
      fetchTransactions();
      dispatch({ type: CREATE_TRANSACTION_RESET });
    }
    if (createError) {
      showToast(createError, "error");
      dispatch(clearErrors());
    }
  }, [createSuccess, createError, dispatch, fetchTransactions]);

  // ─── Handle update success ───────────────────────────────────────────────
  useEffect(() => {
    if (updateSuccess) {
      showToast("Transaction updated!", "success");
      setShowForm(false);
      setEditData(null);
      fetchTransactions();
      dispatch({ type: UPDATE_TRANSACTION_RESET });
    }
    if (updateError) {
      showToast(updateError, "error");
      dispatch(clearErrors());
    }
  }, [updateSuccess, updateError]);

  // ─── Handle delete success ───────────────────────────────────────────────
  useEffect(() => {
    if (deleteSuccess) {
      showToast("Transaction deleted.", "success");
      setDeleteId(null);
      fetchTransactions();
      dispatch({ type: DELETE_TRANSACTION_RESET });
    }
    if (deleteError) {
      showToast(deleteError, "error");
      dispatch(clearErrors());
    }
  }, [deleteSuccess, deleteError]);

  const handleFormSubmit = (formData) => {
    if (editData) {
      dispatch(updateTransaction(editData._id, formData));
    } else {
      dispatch(createTransaction(formData));
    }
  };

  const handleEdit = (transaction) => {
    setEditData(transaction);
    setShowForm(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTransaction(deleteId));
  };

  const handleFilter = (filters) => {
    setActiveFilters(filters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    setPage(1);
  };

  // ─── Filtered by search (client-side) ───────────────────────────────────
  const displayed = transactions.filter(
    (t) =>
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ─── Summary Calculations ────────────────────────────────────────────────
  const totalIncome = transactions
    .filter((t) => t.transactionType === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.transactionType === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ─── Page Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Transactions</h1>
            <p className="text-sm text-black mt-0.5">
              Manage and track all your transactions
            </p>
          </div>
          <button
            onClick={() => {
              setEditData(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700
                       text-white rounded-xl font-semibold text-sm transition-all shadow-lg
                       shadow-purple-200 dark:shadow-purple-900/30 active:scale-95"
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
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Transaction
          </button>
        </div>

        {/* ─── Summary Cards ────────────────────────────────────────────── */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <SummaryCard
            label="Total Income"
            amount={totalIncome}
            icon="💚"
            color="bg-green-50 text-green-700"
          />
          <SummaryCard
            label="Total Expense"
            amount={totalExpense}
            icon="🔴"
            color="bg-red-50 text-red-700"
          />
          <SummaryCard
            label="Balance"
            amount={balance}
            icon={balance >= 0 ? "📈" : "📉"}
            color={`${balance >= 0 ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"}`}
          />
        </div>

        {/* ─── Search + Filter Row ──────────────────────────────────────── */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-900 bg-white  text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
            />
          </div>
          <TransactionFilters
            onFilter={handleFilter}
            onReset={handleResetFilters}
          />
        </div>

        {/* ─── Transaction List ─────────────────────────────────────────── */}
        <div className="space-y-2.5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-4">🧾</div>
              <p className="text-gray-600 font-medium">No transactions found</p>
              <p className="text-sm text-gray-400 mt-1">
                {Object.values(activeFilters).some(Boolean) || searchQuery
                  ? "Try adjusting your filters"
                  : "Add your first transaction to get started"}
              </p>
              {!Object.values(activeFilters).some(Boolean) && !searchQuery && (
                <button
                  onClick={() => {
                    setEditData(null);
                    setShowForm(true);
                  }}
                  className="mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  + Add Transaction
                </button>
              )}
            </div>
          ) : (
            displayed.map((t) => (
              <TransactionCard
                key={t._id}
                transaction={t}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
              />
            ))
          )}
        </div>

        {/* ─── Pagination ───────────────────────────────────────────────── */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200text-gray-500
                         hover:bg-gray-100 disabled:opacity-40 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
                  ${
                    p === page
                      ? "bg-purple-600 text-white shadow-sm"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="p-2 rounded-lg border border-gray-200 text-gray-500
                         hover:bg-gray-100 disabled:opacity-40 transition-colors"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ─── Modals ──────────────────────────────────────────────────────── */}
      {showForm && (
        <TransactionForm
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
          loading={editData ? updateLoading : createLoading}
          editData={editData}
        />
      )}

      {deleteId && (
        <DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
          loading={deleteLoading}
        />
      )}

      {/* ─── Toast Notification ───────────────────────────────────────────── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl
                         shadow-2xl text-sm font-medium animate-slide-up
                         ${
                           toast.type === "success"
                             ? "bg-gray-900 text-white"
                             : "bg-red-500 text-white"
                         }`}
        >
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
