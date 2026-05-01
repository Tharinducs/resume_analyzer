import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice"
import loaderReducer from "@/features/common/loaderSlice";
import commonReducer from "@/features/common/commonSlice"
import { authApi } from "@/features/auth/apiSlice";
import { resumeApi } from "@/features/resume/apiSlice";
import { analysisApi } from "@/features/analysis/apiSlice";

const rootReducer = combineReducers({
  [authApi.reducerPath] : authApi.reducer,
  [resumeApi.reducerPath] : resumeApi.reducer,
  [analysisApi.reducerPath] : analysisApi.reducer,
  auth : authReducer,
  loader: loaderReducer,
  common: commonReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;