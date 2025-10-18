"use client"
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense, use } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store"
import { Toaster } from "@/components/ui/toaster"
import GlobalLoader from "@/components/ui/loader"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Toaster />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider defaultTheme="dark" storageKey="ai-resume-analyzer-theme">
              <Suspense fallback={null}>{children}</Suspense>
            </ThemeProvider>
            <GlobalLoader />
          </PersistGate>
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}
