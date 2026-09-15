import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuth, MOCK_USERS } from "../../context/AuthContext";
import { usePrompts } from "../../context/PromptContext";
import { Check, User, ShieldCheck, Mail, Users } from "lucide-react";

export const LoginModal: React.FC = () => {
  const { currentUser, isLoginModalOpen, setIsLoginModalOpen, switchUser, login } = useAuth();
  const { showToast } = usePrompts();

  const [customName, setCustomName] = useState("");
  const [customRole, setCustomRole] = useState("Prompt Engineer");
  const [activeTab, setActiveTab] = useState<"switch" | "custom">("switch");

  const handleSelectUser = (userId: string) => {
    switchUser(userId);
    setIsLoginModalOpen(false);
    const selected = MOCK_USERS.find((u) => u.id === userId);
    showToast(`Beralih ke akun: ${selected?.name} (${selected?.role})`, "success");
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    login({
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: customName.trim(),
      email: `${customName.toLowerCase().replace(/\s+/g, ".")}@promptweb.id`,
      role: customRole.trim() || "Web Developer",
      team: "Tim Inovasi Web",
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customName)}`,
      promptsCreated: 0
    });

    setIsLoginModalOpen(false);
    showToast(`Selamat datang, ${customName}!`, "success");
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => setIsLoginModalOpen(false)}
      title="Autentikasi & Akun Tim"
      description="Pilih profil kolaborator atau masuk dengan identitas baru Anda"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Toggle Mode */}
        <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("switch")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "switch"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            Pilih Anggota Tim
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("custom")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === "custom"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            Masuk Pengguna Baru
          </button>
        </div>

        {activeTab === "switch" ? (
          <div className="space-y-3">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Profil berikut telah disiapkan untuk simulasi kolaborasi tim edukasi & pengembangan:
            </p>

            {MOCK_USERS.map((usr) => {
              const isSelected = currentUser?.id === usr.id;
              return (
                <div
                  key={usr.id}
                  onClick={() => handleSelectUser(usr.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#00AA13] bg-[#00AA13]/5 dark:bg-[#00AA13]/10"
                      : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={usr.avatarUrl}
                      alt={usr.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                          {usr.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#00880D] dark:text-[#38D84B] bg-[#00AA13]/15 px-2 py-0.5 rounded-full">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {usr.role} • {usr.team}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="h-6 w-6 rounded-full bg-[#00AA13] text-white flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <Input
              label="Nama Lengkap"
              placeholder="Contoh: Rian Pratama"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              required
            />
            <Input
              label="Peran / Role"
              placeholder="Contoh: Frontend Lead, Product Owner"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
            />
            <div className="pt-2">
              <Button type="submit" className="w-full font-bold">
                Masuk Sekarang
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
