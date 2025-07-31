"use client"

import React from "react"
import { ThemeProvider } from "@/context/ThemeContext"
import { Layout as BaseLayout } from "./Layout"

interface ThemedLayoutProps {
  children: React.ReactNode
}

export const ThemedLayout: React.FC<ThemedLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <BaseLayout>
        {children}
      </BaseLayout>
    </ThemeProvider>
  )
}
