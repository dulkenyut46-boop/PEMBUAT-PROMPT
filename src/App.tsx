import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { PromptProvider } from "./context/PromptContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PromptProvider>
          <DashboardLayout />
        </PromptProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

