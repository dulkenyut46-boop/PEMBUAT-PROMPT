export type PromptCategory =
  | "Edukasi"
  | "SaaS & Dashboard"
  | "E-Commerce"
  | "On-Demand & Logistik"
  | "Fintech"
  | "Kesehatan"
  | "UMKM & Bisnis";

export type PromptStatus = "Aktif" | "Draft" | "Diarsipkan";

export type ComplexityLevel = "Pemula" | "Menengah" | "Kompleks" | "Enterprise";

export interface TechStackConfig {
  framework: string;
  uiFramework: string;
  componentLibrary: string;
  database: string;
  stateManagement: string;
  deployment: string;
}

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  tags: string[];
  techStack: TechStackConfig;
  fullPromptContent: string;
  status: PromptStatus;
  isFavorite: boolean;
  copyCount: number;
  viewCount: number;
  complexity: ComplexityLevel;
  tokenEstimate: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  authorRole: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: PromptCategory;
  recommendedStack: TechStackConfig;
  samplePrompt: string;
  popularRank: number;
  tags: string[];
}

export interface FilterOptions {
  search: string;
  category: string;
  status: string;
  complexity: string;
  isFavoriteOnly: boolean;
  sortBy: "terbaru" | "terlama" | "terpopuler" | "nama-asc";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  team: string;
  promptsCreated: number;
}
