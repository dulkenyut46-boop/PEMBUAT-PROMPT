import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gojek" | "secondary" | "success" | "warning" | "danger" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", children, ...props }) => {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors select-none";

  const variants = {
    default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60",
    gojek: "bg-[#00AA13]/15 text-[#00880D] dark:bg-[#00AA13]/25 dark:text-[#38D84B] border border-[#00AA13]/30 font-semibold",
    secondary: "bg-neutral-200/70 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    danger: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
    outline: "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 bg-transparent"
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
