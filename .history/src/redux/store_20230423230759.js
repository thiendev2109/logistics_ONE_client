import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authAdminSlice from "./slice/authAdminSlice";
import customerSlice from "./slice/customerSlice";
import warehouseSlice from "./slice/warehouseSlice";
import employeeTypeSlice from "./slice/employeeTypeSlice";
import containerSlice from "./slice/containerSlice"
import employeeSlice from "./slice/employeeSlice";
import serviceSlice from "./slice/serviceSlice"
import merchandiseSlice from "./slice/merchandiseSlice";

const rootReducer = combineReducers({
  authAdmin: authAdminSlice.reducer,
  customer: customerSlice.reducer,
  warehouse: warehouseSlice.reducer,
  employeeType: employeeTypeSlice.reducer,
  container: containerSlice.reducer,
  employee: employeeSlice.reducer,
  service: serviceSlice.reducer,
  merchandise: merchandiseSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
