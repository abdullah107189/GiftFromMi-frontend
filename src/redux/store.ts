import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice"
import storage from "redux-persist/lib/storage"

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import cartReducer from "./features/cart/cartSlice";
import { cartPersistMiddleware } from "./features/cart/cartPersistMiddleware";
// ===========
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  // The cart is intentionally NOT persisted here.
  // Guest cart persistence is handled separately by cartPersistMiddleware.
  // Logged-in cart must always come from the server.
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: [baseApi.reducerPath],
        warnAfter: 128,
      },
    }).concat(baseApi.middleware, cartPersistMiddleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
