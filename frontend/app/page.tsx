"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRefreshTokenMutation } from "@/features/auth/apiSlice";
import { useRouter } from "next/navigation";
import { get, isEmpty } from "lodash";
import { API_CODES } from "@/constants/apiCodes";
import { loginSuccess } from "@/features/auth/authSlice";

export default function HomePage() {
  const [refreshToken, { isLoading: isRefreshLoading, isSuccess }] = useRefreshTokenMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isEmpty(user)) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      refreshToken(get(user, "_id")).unwrap().then((data: { code: string; user: any }) => {
        if (get(data, 'code') === API_CODES.AUTH.AUTH_REFRESH_TOKEN_SUC) {
          dispatch(loginSuccess(get(data, 'user', {})));
          // Redirect to dashboard after successful token refresh
          router.replace("/dashboard")
        }
      }).catch((err: any) => {
        console.error("Error refreshing token: ", err);
      });
    } else {
      // Redirect to login if no user
      router.replace("/login")
    }
  }, []);


  return (isRefreshLoading ? (<>
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div></>)
    : <></>
  )
}
