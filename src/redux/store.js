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
<<<<<<< HEAD
import containerSlice from "./slice/containerSlice"
=======
import employeeSlice from "./slice/employeeSlice";
>>>>>>> fa22a7a7f6ef55c930614f8b250c231eb1c66ed9

const rootReducer = combineReducers({
  authAdmin: authAdminSlice.reducer,
  customer: customerSlice.reducer,
  warehouse: warehouseSlice.reducer,
  employeeType: employeeTypeSlice.reducer,
<<<<<<< HEAD
  container: containerSlice.reducer,
=======
  employee: employeeSlice.reducer,
>>>>>>> fa22a7a7f6ef55c930614f8b250c231eb1c66ed9
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
