import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface BarChartProps {
  data: BarDataPoint[];
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 220,
  title,
  subtitle,
  className
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value), 10);
  const chartHeight = height - 50;

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {(title || subtitle) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{title}</h4>}
            {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
          </div>
          {hoveredIndex !== null && (
            <div className="text-xs font-semibold px-2.5 py-1 bg-[#00AA13]/10 dark:bg-[#00AA13]/20 text-[#00880D] dark:text-[#38D84B] rounded-lg border border-[#00AA13]/20 animate-in fade-in">
              {data[hoveredIndex].label}: {data[hoveredIndex].value} prompt
            </div>
          )}
        </div>
      )}

      <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-neutral-400 border-dashed w-full" />
          <div className="border-b border-neutral-400 border-dashed w-full" />
          <div className="border-b border-neutral-400 border-dashed w-full" />
          <div className="border-b border-neutral-400 border-dashed w-full" />
        </div>

        {/* Bars */}
        <div className="relative h-full flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2">
          {data.map((item, idx) => {
            const heightPercent = Math.max(8, (item.value / maxValue) * 100);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Floating tooltip */}
                <div
                  className={cn(
                    "mb-1 text-[11px] font-bold transition-all px-1.5 py-0.5 rounded-md",
                    isHovered
                      ? "opacity-100 -translate-y-1 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "opacity-0 group-hover:opacity-100 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {item.value}
                </div>

                {/* Bar */}
                <div
                  className={cn(
                    "w-full max-w-[36px] rounded-t-lg transition-all duration-300",
                    isHovered
                      ? "bg-[#00880D] shadow-md shadow-[#00AA13]/30 scale-y-105"
                      : "bg-[#00AA13] dark:bg-[#00AA13]/90 hover:bg-[#00880D]"
                  )}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* X Axis Label */}
                <span className="mt-2 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate max-w-[48px] text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
