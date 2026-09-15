import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "../types/prompt";

export const MOCK_USERS: UserProfile[] = [
  {
    id: "usr-01",
    name: "Budi Santoso",
    email: "budi.santoso@gojek-dev.id",
    role: "Lead Prompt Architect",
    team: "Tim Edukasi & AI Engineering",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    promptsCreated: 24
  },
  {
    id: "usr-02",
    name: "Dewi Lestari",
    email: "dewi.lestari@gojek-dev.id",
    role: "Senior Product Designer",
    team: "Tim UI/UX & Design System",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    promptsCreated: 16
  },
  {
    id: "usr-03",
    name: "Ahmad Zaki",
    email: "ahmad.zaki@gojek-dev.id",
    role: "Full-Stack Developer",
    team: "Tim Core Platform",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    promptsCreated: 9
  }
];

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (user?: UserProfile) => void;
  logout: () => void;
  switchUser: (userId: string) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("app_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_USERS[0];
      }
    }
    return MOCK_USERS[0];
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("app_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("app_user");
    }
  }, [currentUser]);

  const login = (user?: UserProfile) => {
    const selected = user || MOCK_USERS[0];
    setCurrentUser(selected);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchUser,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
