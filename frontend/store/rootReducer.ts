import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice"
import { authApi } from "@/features/auth/apiSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath] : authApi.reducer,
  auth : authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;