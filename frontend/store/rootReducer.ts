import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice"
import loaderReducer from "@/features/common/loaderSlice";
import { authApi } from "@/features/auth/apiSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath] : authApi.reducer,
  auth : authReducer,
  loader: loaderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;