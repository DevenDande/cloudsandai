import { useEffect, useRef, useState } from 'react';

interface NodePoint {
  x: number;
  y: number;
  label?: string;
}

interface Connection {
  from: number;
  to: number;
}

const nodes: NodePoint[] = [
  { x: 80, y: 60, label: 'x₁' },
  { x: 80, y: 140, label: 'x₂' },
  { x: 80, y: 220, label: 'x₃' },
  { x: 220, y: 100, label: 'h₁' },
  { x: 220, y: 180, label: 'h₂' },
  { x: 360, y: 140, label: 'y' },
];

const connections: Connection[] = [
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
];

export function MathMotif({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 440 280"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(59, 109, 240, 0.06)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 109, 240, 0.15)" />
            <stop offset="50%" stopColor="rgba(59, 109, 240, 0.35)" />
            <stop offset="100%" stopColor="rgba(59, 109, 240, 0.15)" />
          </linearGradient>
        </defs>
        <rect width="440" height="280" fill="url(#grid)" />

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          return (
            <line
              key={`conn-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.8s ease ${0.3 + i * 0.08}s`,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g
            key={`node-${i}`}
            style={{
              opacity: mounted ? 1 : 0,
              transition: `opacity 0.6s ease ${0.1 + i * 0.1}s`,
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="14"
              fill="white"
              stroke="rgba(59, 109, 240, 0.3)"
              strokeWidth="1"
            />
            <circle cx={node.x} cy={node.y} r="4" fill="rgba(59, 109, 240, 0.5)" />
            {node.label && (
              <text
                x={node.x}
                y={node.y - 22}
                textAnchor="middle"
                className="font-mono"
                fontSize="10"
                fill="rgba(13, 15, 18, 0.4)"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}

        {/* Mathematical annotations */}
        <text
          x="20"
          y="265"
          className="font-mono"
          fontSize="11"
          fill="rgba(13, 15, 18, 0.15)"
        >
          ∂L/∂w = Σ ∇θ ℒ(θ)
        </text>
        <text
          x="300"
          y="265"
          className="font-mono"
          fontSize="11"
          fill="rgba(13, 15, 18, 0.15)"
        >
          σ(wx + b)
        </text>
      </svg>
    </div>
  );
}
