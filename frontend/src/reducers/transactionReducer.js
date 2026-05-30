import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAIL,
  CREATE_TRANSACTION_RESET,
  GET_ALL_TRANSACTIONS_REQUEST,
  GET_ALL_TRANSACTIONS_SUCCESS,
  GET_ALL_TRANSACTIONS_FAIL,
  GET_TRANSACTION_DETAIL_REQUEST,
  GET_TRANSACTION_DETAIL_SUCCESS,
  GET_TRANSACTION_DETAIL_FAIL,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_RESET,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_RESET,
  CLEAR_ERRORS,
} from "../constants/transactionConstants";


export const transactionsReducer = (
  state = { transactions: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };

    case GET_ALL_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.transactions,
        count: action.payload.count,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case GET_ALL_TRANSACTIONS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// ─── Transaction Detail Reducer ───────────────────────────────────────────────
export const transactionDetailReducer = (
  state = { transaction: {}, loading: false },
  action
) => {
  switch (action.type) {
    case GET_TRANSACTION_DETAIL_REQUEST:
      return { ...state, loading: true };

    case GET_TRANSACTION_DETAIL_SUCCESS:
      return { loading: false, transaction: action.payload };

    case GET_TRANSACTION_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// ─── Create Transaction Reducer ───────────────────────────────────────────────
export const createTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return { loading: true };

    case CREATE_TRANSACTION_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };

    case CREATE_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };

    case CREATE_TRANSACTION_RESET:
      return {};

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// ─── Update Transaction Reducer ───────────────────────────────────────────────
export const updateTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TRANSACTION_REQUEST:
      return { loading: true };

    case UPDATE_TRANSACTION_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };

    case UPDATE_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };

    case UPDATE_TRANSACTION_RESET:
      return {};

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

// ─── Delete Transaction Reducer ───────────────────────────────────────────────
export const deleteTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRANSACTION_REQUEST:
      return { loading: true };

    case DELETE_TRANSACTION_SUCCESS:
      return { loading: false, success: true, deletedId: action.payload };

    case DELETE_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };

    case DELETE_TRANSACTION_RESET:
      return {};

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
