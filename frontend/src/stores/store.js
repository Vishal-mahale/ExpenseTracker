import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {thunk} from "redux-thunk"; // ✅ Correct import (not destructured)
import { userReducer, forgotPasswordReducer } from "../reducers/userReducer";



// store.js
import {
  transactionsReducer, createTransactionReducer,
  updateTransactionReducer, deleteTransactionReducer
} from "../reducers/transactionReducer";

// Combine reducers
const reducers = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  transactions: transactionsReducer,
  createTransaction: createTransactionReducer,
  updateTransaction: updateTransactionReducer,
  deleteTransaction: deleteTransactionReducer,
});


const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;