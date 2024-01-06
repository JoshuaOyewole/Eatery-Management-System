import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from "./features/auth/authSlice2";
import staffReducer from "./features/staffs/staffSlice";
//import userReducer from "./features/users/userSlice";
import mealReducer from "./features/meal/mealSlice";
import addOrderReducer from "./features/addOrder/addOrderSlice";
import topSelling from "./features/dashboard-summary/topSellingSlice";
import dashboardSummary from "./features/dashboard-summary/dashboardsummarySlice";
import getTotalOrdersLast7Days from "./features/dashboard-summary/getTotalOrdersLast7Days";
import lastTransactionsSlice from "./features/dashboard-summary/lastTransactionsSlice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

//    user: userReducer,
const rootReducer = combineReducers({
  staff: staffReducer,
  auth: authReducer,
  meal: mealReducer,
  addOrder: addOrderReducer,
  topSelling,
  dashboardSummary,
  getTotalOrdersLast7Days,
  getLastTransactions: lastTransactionsSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch