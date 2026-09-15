import React, { useState } from "react";
import {
  Copy,
  Check,
  Eye,
  Edit,
  Trash2,
  Star,
  Layers,
  Sparkles,
  Calendar,
  AlertCircle
} from "lucide-react";
import { usePrompts } from "../../context/PromptContext";
import { PromptItem } from "../../types/prompt";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Pagination } from "../ui/Pagination";
import { formatDateID } from "../../lib/utils";

interface PromptListTableProps {
  viewMode: "table" | "grid";
}

export const PromptListTable: React.FC<PromptListTableProps> = ({ viewMode }) => {
  const {
    filteredPrompts,
    setSelectedPrompt,
    setIsDetailModalOpen,
    setEditingPrompt,
    setIsEditModalOpen,
    deletePrompt,
    toggleFavorite,
    duplicatePrompt,
    recordCopy,
    recordView,
    showToast,
    resetFilters
  } = usePrompts();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalItems = filteredPrompts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Current page slice
  const paginatedPrompts = filteredPrompts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = async (e: React.MouseEvent, prompt: PromptItem) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.fullPromptContent);
      setCopiedId(prompt.id);
      recordCopy(prompt.id);
      showToast(`Prompt "${prompt.title}" berhasil disalin!`, "success");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast("Gagal menyalin prompt.", "error");
    }
  };

  const handleRowClick = (prompt: PromptItem) => {
    recordView(prompt.id);
    setSelectedPrompt(prompt);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, prompt: PromptItem) => {
    e.stopPropagation();
    setEditingPrompt(prompt);
    setIsEditModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, prompt: PromptItem) => {
    e.stopPropagation();
    if (window.confirm(`Hapus prompt "${prompt.title}"?`)) {
      deletePrompt(prompt.id);
    }
  };

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  if (totalItems === 0) {
    return (
      <Card className="p-12 text-center flex flex-col items-center justify-center">
        <div className="h-12 w-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-3">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
          Tidak ada prompt yang cocok
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mt-1 mb-4">
          Coba sesuaikan kata kunci pencarian atau ubah filter kategori dan status Anda.
        </p>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset Semua Filter
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {viewMode === "table" ? (
        /* Modern Scrollable Table View */
        <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 font-semibold">
                  <th className="py-3 px-4 w-10 text-center">★</th>
                  <th className="py-3 px-4 min-w-[240px]">Judul & Deskripsi Prompt</th>
                  <th className="py-3 px-4 min-w-[130px]">Kategori</th>
                  <th className="py-3 px-4 min-w-[180px]">Target Stack</th>
                  <th className="py-3 px-4 w-24">Status</th>
                  <th className="py-3 px-4 w-28 text-center">Disalin</th>
                  <th className="py-3 px-4 w-28">Dibuat</th>
                  <th className="py-3 px-4 w-28 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {paginatedPrompts.map((prompt) => {
                  const isCopied = copiedId === prompt.id;

                  return (
                    <tr
                      key={prompt.id}
                      onClick={() => handleRowClick(prompt)}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer group"
                    >
                      {/* Favorite Star */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => handleToggleFav(e, prompt.id)}
                          className="text-neutral-300 hover:text-amber-400 transition-colors p-1"
                          title={prompt.isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              prompt.isFavorite ? "fill-amber-400 text-amber-400" : ""
                            }`}
                          />
                        </button>
                      </td>

                      {/* Title & Desc */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm group-hover:text-[#00AA13] transition-colors leading-snug">
                          {prompt.title}
                        </div>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 max-w-md">
                          {prompt.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {prompt.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-1.5 py-0.2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <Badge variant="gojek">{prompt.category}</Badge>
                      </td>

                      {/* Tech Stack snippet */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[170px]">
                          {prompt.techStack.framework.split(" ")[0]}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate max-w-[170px]">
                          {prompt.techStack.database}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            prompt.status === "Aktif"
                              ? "success"
                              : prompt.status === "Draft"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {prompt.status}
                        </Badge>
                      </td>

                      {/* Copy count */}
                      <td className="py-3.5 px-4 text-center font-bold text-neutral-700 dark:text-neutral-300">
                        {prompt.copyCount}x
                      </td>

                      {/* Created date */}
                      <td className="py-3.5 px-4 text-[11px] text-neutral-500 dark:text-neutral-400">
                        {formatDateID(prompt.createdAt)}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => handleCopy(e, prompt)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isCopied
                                ? "border-[#00AA13] bg-[#00AA13]/10 text-[#00880D]"
                                : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                            }`}
                            title="Salin Prompt Cepat"
                          >
                            {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>

                          <button
                            onClick={(e) => handleEdit(e, prompt)}
                            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={(e) => handleDelete(e, prompt)}
                            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-neutral-400 hover:text-rose-600 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Modern Cards Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedPrompts.map((prompt) => {
            const isCopied = copiedId === prompt.id;

            return (
              <Card
                key={prompt.id}
                onClick={() => handleRowClick(prompt)}
                className="p-5 flex flex-col justify-between hover:border-[#00AA13]/40 hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="gojek">{prompt.category}</Badge>
                      <Badge variant="outline">{prompt.complexity}</Badge>
                    </div>
                    <button
                      onClick={(e) => handleToggleFav(e, prompt.id)}
                      className="text-neutral-300 hover:text-amber-400 p-1"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          prompt.isFavorite ? "fill-amber-400 text-amber-400" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-[#00AA13] transition-colors line-clamp-2">
                    {prompt.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1.5">
                    {prompt.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {prompt.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px]">
                    {formatDateID(prompt.createdAt)} • {prompt.copyCount}x salin
                  </span>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => handleCopy(e, prompt)}
                      className="h-7 px-2 text-xs"
                    >
                      {isCopied ? <Check className="h-3 w-3 text-[#00AA13]" /> : <Copy className="h-3 w-3" />}
                      <span>{isCopied ? "Tersalin" : "Salin"}</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        onItemsPerPageChange={(limit) => {
          setItemsPerPage(limit);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};
