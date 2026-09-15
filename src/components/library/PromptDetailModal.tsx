import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { usePrompts } from "../../context/PromptContext";
import { formatDateID } from "../../lib/utils";
import {
  Copy,
  Check,
  Edit,
  Trash2,
  Download,
  Star,
  Layers,
  Calendar,
  User,
  Sparkles
} from "lucide-react";

export const PromptDetailModal: React.FC = () => {
  const {
    selectedPrompt,
    isDetailModalOpen,
    setIsDetailModalOpen,
    setEditingPrompt,
    setIsEditModalOpen,
    deletePrompt,
    toggleFavorite,
    duplicatePrompt,
    recordCopy,
    showToast
  } = usePrompts();

  const [copied, setCopied] = useState(false);

  if (!selectedPrompt) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedPrompt.fullPromptContent);
      setCopied(true);
      recordCopy(selectedPrompt.id);
      showToast("Prompt berhasil disalin ke clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Gagal menyalin prompt.", "error");
    }
  };

  const handleEdit = () => {
    setIsDetailModalOpen(false);
    setEditingPrompt(selectedPrompt);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus prompt "${selectedPrompt.title}"?`)) {
      deletePrompt(selectedPrompt.id);
      setIsDetailModalOpen(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([selectedPrompt.fullPromptContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedPrompt.id}-${selectedPrompt.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("File markdown berhasil diunduh.", "success");
  };

  return (
    <Modal
      isOpen={isDetailModalOpen}
      onClose={() => setIsDetailModalOpen(false)}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gojek">{selectedPrompt.category}</Badge>
              <Badge variant={selectedPrompt.status === "Aktif" ? "success" : "secondary"}>
                {selectedPrompt.status}
              </Badge>
              <Badge variant="outline">{selectedPrompt.complexity}</Badge>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
              {selectedPrompt.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedPrompt.id)}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-amber-500 hover:border-amber-400 transition-colors"
              title={selectedPrompt.isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
            >
              <Star className={`h-4 w-4 ${selectedPrompt.isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
            </button>
            <Button onClick={handleCopy} className="gap-1.5 font-bold">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Tersalin!" : "Salin Prompt"}</span>
            </Button>
          </div>
        </div>

        {/* Description & Tech Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 space-y-1.5">
            <div className="font-bold text-neutral-700 dark:text-neutral-300">Deskripsi Kebutuhan Masalah:</div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {selectedPrompt.description}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-neutral-700 dark:text-neutral-300">
              <User className="h-3.5 w-3.5 text-[#00AA13]" />
              <span>{selectedPrompt.createdBy}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Dibuat: {formatDateID(selectedPrompt.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <Sparkles className="h-3.5 w-3.5 text-[#00AA13]" />
              <span>Disalin {selectedPrompt.copyCount} kali</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-2">
            Spesifikasi Stack yang Ditetapkan:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span className="text-[10px] text-neutral-400 block font-semibold">Framework</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate block">
                {selectedPrompt.techStack.framework}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span className="text-[10px] text-neutral-400 block font-semibold">UI & Component</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate block">
                {selectedPrompt.techStack.uiFramework} + {selectedPrompt.techStack.componentLibrary.split(" ")[0]}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span className="text-[10px] text-neutral-400 block font-semibold">Database & Auth</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate block">
                {selectedPrompt.techStack.database}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <span className="text-[10px] text-neutral-400 block font-semibold">Deployment</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate block">
                {selectedPrompt.techStack.deployment}
              </span>
            </div>
          </div>
        </div>

        {/* Prompt Content Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-bold uppercase tracking-wider text-[11px]">Isi Prompt Lengkap:</span>
            <span>~{selectedPrompt.tokenEstimate} Token</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 text-neutral-100 font-mono text-xs overflow-y-auto max-h-[360px] custom-scrollbar border border-neutral-800">
            <pre className="whitespace-pre-wrap leading-relaxed">
              {selectedPrompt.fullPromptContent}
            </pre>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-3.5 w-3.5 text-neutral-500" />
              <span>Edit Prompt</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => duplicatePrompt(selectedPrompt.id)}
            >
              <Layers className="h-3.5 w-3.5 text-neutral-500" />
              <span>Duplikasi</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="h-3.5 w-3.5" />
              <span>Unduh .md</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Hapus</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
