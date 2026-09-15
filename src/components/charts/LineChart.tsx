import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface LineDataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineDataPoint[];
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 220,
  title,
  subtitle,
  className
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 10);
  const chartHeight = height - 50;
  const chartWidth = 500;

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - (d.value / maxValue) * (chartHeight - 30) - 15;
    return { x, y, label: d.label, value: d.value };
  });

  // Build SVG path
  const pathD = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, "");

  // Area path for gradient background
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

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
              {data[hoveredIndex].label}: {data[hoveredIndex].value} kali disalin
            </div>
          )}
        </div>
      )}

      <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gojekLineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00AA13" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00AA13" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal lines */}
          <line x1="10" y1={chartHeight * 0.25} x2={chartWidth - 10} y2={chartHeight * 0.25} stroke="currentColor" strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1" />
          <line x1="10" y1={chartHeight * 0.5} x2={chartWidth - 10} y2={chartHeight * 0.5} stroke="currentColor" strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1" />
          <line x1="10" y1={chartHeight * 0.75} x2={chartWidth - 10} y2={chartHeight * 0.75} stroke="currentColor" strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-800" strokeWidth="1" />

          {/* Area fill */}
          <path d={areaD} fill="url(#gojekLineGradient)" />

          {/* Main curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#00AA13"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((pt, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  className={cn(
                    "transition-all cursor-pointer fill-white dark:fill-neutral-900 stroke-[#00AA13]",
                    isHovered ? "stroke-[3.5] filter drop-shadow-md" : "stroke-2"
                  )}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Labels below */}
        <div className="flex justify-between mt-2 px-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
          {data.map((item, idx) => (
            <span
              key={idx}
              className={cn(
                "transition-colors cursor-pointer text-center",
                hoveredIndex === idx && "text-[#00AA13] dark:text-[#38D84B] font-bold"
              )}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
