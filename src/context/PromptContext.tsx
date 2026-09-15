import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { PromptItem, FilterOptions, PromptCategory } from "../types/prompt";
import { INITIAL_PROMPTS } from "../data/initialPrompts";
import { useAuth } from "./AuthContext";

export type NavigationTab = "dashboard" | "generator" | "library" | "templates" | "guide" | "settings";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface PromptContextType {
  prompts: PromptItem[];
  filteredPrompts: PromptItem[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  // CRUD actions
  addPrompt: (promptData: Partial<PromptItem> & { title: string; fullPromptContent: string }) => PromptItem;
  updatePrompt: (id: string, updates: Partial<PromptItem>) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  duplicatePrompt: (id: string) => void;
  recordCopy: (id: string) => void;
  recordView: (id: string) => void;
  // Modals & Selected Prompt
  selectedPrompt: PromptItem | null;
  setSelectedPrompt: (prompt: PromptItem | null) => void;
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (open: boolean) => void;
  editingPrompt: PromptItem | null;
  setEditingPrompt: (prompt: PromptItem | null) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "warning" | "error") => void;
  removeToast: (id: string) => void;
  // Analytics
  stats: {
    totalPrompts: number;
    totalCopies: number;
    totalViews: number;
    favoriteCount: number;
    hoursSaved: number;
    estimatedValueIDR: number;
    categoryCounts: Record<string, number>;
  };
  // Generator prefill helper
  prefillGenerator: (data: Partial<PromptItem>) => void;
  generatorPrefillData: Partial<PromptItem> | null;
  clearGeneratorPrefill: () => void;
}

const defaultFilters: FilterOptions = {
  search: "",
  category: "Semua Kategori",
  status: "Semua Status",
  complexity: "Semua Kompleksitas",
  isFavoriteOnly: false,
  sortBy: "terbaru"
};

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [prompts, setPrompts] = useState<PromptItem[]>(() => {
    const saved = localStorage.getItem("app_prompts_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROMPTS;
      }
    }
    return INITIAL_PROMPTS;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>("dashboard");
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [generatorPrefillData, setGeneratorPrefillData] = useState<Partial<PromptItem> | null>(null);

  useEffect(() => {
    localStorage.setItem("app_prompts_data", JSON.stringify(prompts));
  }, [prompts]);

  const showToast = (message: string, type: "success" | "info" | "warning" | "error" = "success") => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addPrompt = (promptData: Partial<PromptItem> & { title: string; fullPromptContent: string }): PromptItem => {
    const newId = `prm-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();
    
    // Calculate estimate tokens roughly (1 token ~ 4 chars)
    const tokenEstimate = Math.ceil(promptData.fullPromptContent.length / 4);

    const newPrompt: PromptItem = {
      id: newId,
      title: promptData.title,
      description: promptData.description || "Prompt web komprehensif siap eksekusi dengan arsitektur lengkap.",
      category: (promptData.category as PromptCategory) || "SaaS & Dashboard",
      tags: promptData.tags && promptData.tags.length > 0 ? promptData.tags : ["Web App", "TailwindCSS"],
      techStack: promptData.techStack || {
        framework: "Vite + React SPA + TypeScript",
        uiFramework: "TailwindCSS",
        componentLibrary: "shadcn/ui",
        database: "Firebase (Firestore & Auth)",
        stateManagement: "Zustand",
        deployment: "Vercel SPA rewrite (vercel.json)"
      },
      fullPromptContent: promptData.fullPromptContent,
      status: promptData.status || "Aktif",
      isFavorite: promptData.isFavorite || false,
      copyCount: 0,
      viewCount: 1,
      complexity: promptData.complexity || "Menengah",
      tokenEstimate,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser ? currentUser.name : "Pengembang Indonesia",
      authorRole: currentUser ? currentUser.role : "Prompt Architect"
    };

    setPrompts((prev) => [newPrompt, ...prev]);
    showToast(`Prompt "${newPrompt.title}" berhasil dibuat dan disimpan!`, "success");
    return newPrompt;
  };

  const updatePrompt = (id: string, updates: Partial<PromptItem>) => {
    setPrompts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = {
            ...item,
            ...updates,
            updatedAt: new Date().toISOString(),
            tokenEstimate: updates.fullPromptContent
              ? Math.ceil(updates.fullPromptContent.length / 4)
              : item.tokenEstimate
          };
          if (selectedPrompt && selectedPrompt.id === id) {
            setSelectedPrompt(updated);
          }
          return updated;
        }
        return item;
      })
    );
    showToast("Perubahan prompt berhasil disimpan.", "success");
  };

  const deletePrompt = (id: string) => {
    const target = prompts.find((p) => p.id === id);
    setPrompts((prev) => prev.filter((p) => p.id !== id));
    if (selectedPrompt && selectedPrompt.id === id) {
      setIsDetailModalOpen(false);
      setSelectedPrompt(null);
    }
    showToast(`Prompt "${target ? target.title : id}" berhasil dihapus.`, "info");
  };

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextFav = !item.isFavorite;
          showToast(
            nextFav ? `Ditambahkan ke Favorit: ${item.title}` : `Dihapus dari Favorit`,
            "info"
          );
          return { ...item, isFavorite: nextFav };
        }
        return item;
      })
    );
  };

  const duplicatePrompt = (id: string) => {
    const target = prompts.find((p) => p.id === id);
    if (!target) return;
    const duplicated: PromptItem = {
      ...target,
      id: `prm-${Date.now().toString().slice(-4)}`,
      title: `${target.title} (Salinan)`,
      copyCount: 0,
      viewCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPrompts((prev) => [duplicated, ...prev]);
    showToast(`Prompt berhasil diduplikasi: "${duplicated.title}"`, "success");
  };

  const recordCopy = (id: string) => {
    setPrompts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, copyCount: item.copyCount + 1 } : item))
    );
  };

  const recordView = (id: string) => {
    setPrompts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, viewCount: item.viewCount + 1 } : item))
    );
  };

  const prefillGenerator = (data: Partial<PromptItem>) => {
    setGeneratorPrefillData(data);
    setActiveTab("generator");
  };

  const clearGeneratorPrefill = () => {
    setGeneratorPrefillData(null);
  };

  // Filtered & Sorted Prompts
  const filteredPrompts = useMemo(() => {
    return prompts.filter((item) => {
      // Search query
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // Category
      if (filters.category && filters.category !== "Semua Kategori") {
        if (item.category !== filters.category) return false;
      }

      // Status
      if (filters.status && filters.status !== "Semua Status") {
        if (item.status !== filters.status) return false;
      }

      // Complexity
      if (filters.complexity && filters.complexity !== "Semua Kompleksitas") {
        if (item.complexity !== filters.complexity) return false;
      }

      // Favorite Only
      if (filters.isFavoriteOnly && !item.isFavorite) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "terbaru") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === "terlama") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (filters.sortBy === "terpopuler") {
        return b.copyCount - a.copyCount;
      }
      if (filters.sortBy === "nama-asc") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [prompts, filters]);

  // Calculated Stats
  const stats = useMemo(() => {
    const totalPrompts = prompts.length;
    const totalCopies = prompts.reduce((acc, curr) => acc + curr.copyCount, 0);
    const totalViews = prompts.reduce((acc, curr) => acc + curr.viewCount, 0);
    const favoriteCount = prompts.filter((p) => p.isFavorite).length;

    // Estimate: Each detailed prompt saves ~3.5 hours of PRD & architecture specification time
    const hoursSaved = Math.round(totalCopies * 3.5 + totalPrompts * 2);
    // Rate: Rp 200.000 / jam
    const estimatedValueIDR = hoursSaved * 200000;

    const categoryCounts: Record<string, number> = {};
    prompts.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return {
      totalPrompts,
      totalCopies,
      totalViews,
      favoriteCount,
      hoursSaved,
      estimatedValueIDR,
      categoryCounts
    };
  }, [prompts]);

  return (
    <PromptContext.Provider
      value={{
        prompts,
        filteredPrompts,
        filters,
        setFilters,
        resetFilters,
        activeTab,
        setActiveTab,
        addPrompt,
        updatePrompt,
        deletePrompt,
        toggleFavorite,
        duplicatePrompt,
        recordCopy,
        recordView,
        selectedPrompt,
        setSelectedPrompt,
        isDetailModalOpen,
        setIsDetailModalOpen,
        editingPrompt,
        setEditingPrompt,
        isEditModalOpen,
        setIsEditModalOpen,
        toasts,
        showToast,
        removeToast,
        stats,
        prefillGenerator,
        generatorPrefillData,
        clearGeneratorPrefill
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (!context) throw new Error("usePrompts must be used within PromptProvider");
  return context;
};
