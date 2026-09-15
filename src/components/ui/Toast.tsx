import React from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { ToastMessage } from "../../context/PromptContext";
import { cn } from "../../lib/utils";

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const iconMap = {
          success: <CheckCircle2 className="h-5 w-5 text-[#00AA13] shrink-0" />,
          info: <Info className="h-5 w-5 text-sky-500 shrink-0" />,
          warning: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />,
          error: <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
        };

        const borderMap = {
          success: "border-[#00AA13]/40 bg-white dark:bg-neutral-900",
          info: "border-sky-500/40 bg-white dark:bg-neutral-900",
          warning: "border-amber-500/40 bg-white dark:bg-neutral-900",
          error: "border-rose-500/40 bg-white dark:bg-neutral-900"
        };

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg text-sm text-neutral-900 dark:text-neutral-100 transition-all duration-200 animate-in slide-in-from-bottom-3",
              borderMap[toast.type]
            )}
          >
            <div className="flex items-center gap-3">
              {iconMap[toast.type]}
              <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-md"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
