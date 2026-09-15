import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 180,
  thickness = 26,
  title,
  subtitle,
  className
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  if (total === 0) return null;

  const radius = size / 2;
  const innerRadius = radius - thickness;
  const circumference = 2 * Math.PI * (radius - thickness / 2);

  let accumulatedPercent = 0;

  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      {(title || subtitle) && (
        <div className="w-full mb-3 text-left">
          {title && <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{title}</h4>}
          {subtitle && <p className="text-xs text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full py-2">
        {/* SVG Donut */}
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
            {data.map((seg, idx) => {
              const percent = seg.value / total;
              const strokeDasharray = `${percent * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercent * circumference;
              accumulatedPercent += percent;

              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={idx}
                  cx={radius}
                  cy={radius}
                  r={radius - thickness / 2}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? thickness + 4 : thickness}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {hoveredIdx !== null ? (
              <>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[90px]">
                  {data[hoveredIdx].label}
                </span>
                <span className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
                  {Math.round((data[hoveredIdx].value / total) * 100)}%
                </span>
                <span className="text-[10px] text-neutral-400">
                  {data[hoveredIdx].value} prompt
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                  Total
                </span>
                <span className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                  {total}
                </span>
                <span className="text-[11px] text-[#00AA13] font-medium">
                  Prompt
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 min-w-[140px] text-xs">
          {data.map((seg, idx) => {
            const percent = Math.round((seg.value / total) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between gap-3 px-2 py-1 rounded-lg transition-colors cursor-pointer",
                  isHovered ? "bg-neutral-100 dark:bg-neutral-800 font-semibold" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                )}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="truncate text-neutral-700 dark:text-neutral-300">{seg.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{seg.value}</span>
                  <span className="text-[10px] text-neutral-400">({percent}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
