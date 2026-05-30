// components/transactions/TransactionCard.jsx
import { CATEGORY_ICONS, CATEGORY_COLORS } from "../constants/transactionConstants";

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const { _id, title, amount, transactionType, category, subCategory, paymentMethod, date, tags } = transaction;

  const isIncome = transactionType === "income";
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

  const categoryColor = CATEGORY_COLORS[category] || "#6b7280";

  return (
    <div className="group flex items-center gap-4 px-4 py-3.5 bg-white 
                    rounded-2xl border-1 border-gray-400 
                    hover:shadow-md hover:border-purple-200
                    transition-all duration-200">

      {/* Category Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: `${categoryColor}20`, border: `1.5px solid ${categoryColor}90` }}
      >
        {CATEGORY_ICONS[category] || "📦"}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ color: categoryColor, backgroundColor: `${categoryColor}15` }}
              >
                {category}
              </span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-800">{subCategory}</span>
              <span className="text-xs text-gray-800 hidden sm:inline">•</span>
              <span className="text-xs text-gray-800 hidden sm:inline">{paymentMethod}</span>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Amount & Date */}
          <div className="text-right flex-shrink-0">
            <p className={`text-sm font-bold ${isIncome ? "text-green-500" : "text-red-500"}`}>
              {isIncome ? "+" : "-"}{formattedAmount}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons - shown on hover */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => onEdit(transaction)}
          className="p-2 rounded-lg hover:bg-purple-50
                     text-gray-400 hover:text-purple-600 transition-colors"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="p-2 rounded-lg hover:bg-red-50 
                     text-gray-400 hover:text-red-500 transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
