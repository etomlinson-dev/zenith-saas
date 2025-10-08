"use client"

import type React from "react"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import { Suspense } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})

function ClientLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

  const isModulePage =
    pathname.startsWith("/hub") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/customer-success") ||
    pathname.startsWith("/workforce") ||
    pathname.startsWith("/hr") ||
    pathname.startsWith("/manufacturing") ||
    pathname.startsWith("/automation")

  const isHomePage = pathname === "/"

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
        {isHomePage && <Header />}
        {isModulePage && <Sidebar />}

        <div className={isModulePage ? `transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-72"}` : ""}>
          {children}
        </div>
      </body>
    </html>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense
      fallback={
        <html lang="en">
          <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
            <div>Loading...</div>
          </body>
        </html>
      }
    >
      <SidebarProvider>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </SidebarProvider>
    </Suspense>
  )
}
