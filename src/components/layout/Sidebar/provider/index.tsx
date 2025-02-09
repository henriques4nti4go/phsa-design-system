"use client";
import { createContext, useContext, useState } from "react";

interface SidebarContextData {
  currentPath: string;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCurrentPath: (path: string) => void;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultPath?: string;
  defaultCollapsed?: boolean;
}

const SidebarContext = createContext({} as SidebarContextData);

export function SidebarProvider({
  children,
  defaultPath = "/",
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [currentPath, setCurrentPath] = useState(defaultPath);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        currentPath,
        isCollapsed,
        toggleCollapse,
        setCurrentPath,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
