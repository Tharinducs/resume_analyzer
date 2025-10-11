import { configureStore } from "@reduxjs/toolkit";
import { persistStore , persistReducer} from "redux-persist";

import rootReducer from "./rootReducer";
import persistConfig from "./persistConfig";
import { authApi } from "@/features/auth/apiSlice";

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
        thunk:true
    }).concat(authApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch