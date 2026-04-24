"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type TabId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "contact";

interface TabContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const TabContext = createContext<TabContextType>({
  activeTab: "home",
  setActiveTab: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabId>("home");

  const setActiveTab = useCallback((tab: TabId) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => useContext(TabContext);
