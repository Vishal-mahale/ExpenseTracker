import axios from "axios";
import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAIL,
  GET_ALL_TRANSACTIONS_REQUEST,
  GET_ALL_TRANSACTIONS_SUCCESS,
  GET_ALL_TRANSACTIONS_FAIL,
  GET_TRANSACTION_DETAIL_REQUEST,
  GET_TRANSACTION_DETAIL_SUCCESS,
  GET_TRANSACTION_DETAIL_FAIL,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/transactionConstants";


// ─── Create Transaction ───────────────────────────────────────────────────────
export const createTransaction = (transactionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TRANSACTION_REQUEST });
    console.log(transactionData)
    const { data } = await axios.post("/api/v1/transaction/create", transactionData);
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: data.transaction,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TRANSACTION_FAIL,
      payload: error.response?.data?.message || "Failed to create transaction",
    });
  }
};

export const getAllTransactions =
  (filters = {}) =>
    async (dispatch) => {
      try {
        dispatch({ type: GET_ALL_TRANSACTIONS_REQUEST });
        const {
          category,
          transactionType,
          paymentMethod,
          startDate,
          endDate,
          page = 1,
          limit = 10,
        } = filters;

        // Build query string only for defined values
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (transactionType) params.append("transactionType", transactionType);
        if (paymentMethod) params.append("paymentMethod", paymentMethod);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        params.append("page", page);
        params.append("limit", limit);

        const { data } = await axios.get(
          `/api/v1/transaction/transactions?${params.toString()}`
        );
        console.log(data.transactions)
        dispatch({
          type: GET_ALL_TRANSACTIONS_SUCCESS,
          payload: {
            transactions: data.transactions,
            count: data.count,
            page: data.page,
            pages: data.pages,
          },
        });
      } catch (error) {
        dispatch({
          type: GET_ALL_TRANSACTIONS_FAIL,
          payload:
            error.response?.data?.message || "Failed to fetch transactions",
        });
      }
    };

// ─── Get Single Transaction ───────────────────────────────────────────────────
export const getTransactionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TRANSACTION_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/v1/transaction/${id}`);
    dispatch({
      type: GET_TRANSACTION_DETAIL_SUCCESS,
      payload: data.transaction,
    });
  } catch (error) {
    dispatch({
      type: GET_TRANSACTION_DETAIL_FAIL,
      payload: error.response?.data?.message || "Failed to fetch transaction",
    });
  }
};

// ─── Update Transaction ───────────────────────────────────────────────────────
export const updateTransaction = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRANSACTION_REQUEST });
    const { data } = await axios.put(`/api/v1/transaction/${id}`, updateData);
    dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
      payload: data.transaction,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TRANSACTION_FAIL,
      payload: error.response?.data?.message || "Failed to update transaction",
    });
  }
};

// ─── Delete Transaction ───────────────────────────────────────────────────────
export const deleteTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRANSACTION_REQUEST });
    await axios.delete(`/api/v1/transaction/${id}`);
    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRANSACTION_FAIL,
      payload: error.response?.data?.message || "Failed to delete transaction",
    });
  }
};

// ─── Clear Errors ─────────────────────────────────────────────────────────────
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
