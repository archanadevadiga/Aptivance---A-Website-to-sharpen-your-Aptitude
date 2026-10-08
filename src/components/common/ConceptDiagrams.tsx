import React from 'react';

export const VennDiagramIllustration: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-[#090b10] border border-zinc-800 text-center space-y-2 select-none">
      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
        Two-Set Overlap Logic Model
      </div>
      <svg viewBox="0 0 300 150" className="w-full max-w-[280px] mx-auto h-auto">
        <defs>
          <radialGradient id="vennGradA" cx="40%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="vennGradB" cx="60%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        {/* Circle A */}
        <circle cx="110" cy="75" r="55" fill="url(#vennGradA)" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Circle B */}
        <circle cx="190" cy="75" r="55" fill="url(#vennGradB)" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Labels */}
        <text x="85" y="78" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">Set A</text>
        <text x="150" y="78" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">A ∩ B</text>
        <text x="215" y="78" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Set B</text>
      </svg>
      <div className="text-[11px] text-zinc-400 font-mono">
        Total Union = |A| + |B| - |A ∩ B|
      </div>
    </div>
  );
};

export const ClockAngleDiagram: React.FC<{ hour?: number; minute?: number }> = ({ hour = 3, minute = 30 }) => {
  return (
    <div className="p-4 rounded-2xl bg-[#090b10] border border-zinc-800 text-center space-y-2 select-none">
      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
        Clock Angle Model (At 3:30)
      </div>
      <svg viewBox="0 0 160 160" className="w-32 h-32 mx-auto">
        {/* Clock circle */}
        <circle cx="80" cy="80" r="70" fill="#0d0f17" stroke="#f59e0b" strokeWidth="2" />
        {/* Hour marks 12, 3, 6, 9 */}
        <circle cx="80" cy="20" r="2.5" fill="#f59e0b" />
        <circle cx="140" cy="80" r="2.5" fill="#f59e0b" />
        <circle cx="80" cy="140" r="2.5" fill="#f59e0b" />
        <circle cx="20" cy="80" r="2.5" fill="#f59e0b" />
        {/* Hour hand (pointing towards ~3:30, roughly 105 degrees) */}
        <line x1="80" y1="80" x2="115" y2="92" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        {/* Minute hand (pointing to 6, 180 degrees) */}
        <line x1="80" y1="80" x2="80" y2="135" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        {/* Center pin */}
        <circle cx="80" cy="80" r="4" fill="#fbbf24" />
      </svg>
      <div className="text-[11px] text-zinc-400 font-mono">
        Angle θ = |30H - 5.5M| = |30(3) - 5.5(30)| = 75°
      </div>
    </div>
  );
};

export const CircularSeatingDiagram: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-[#090b10] border border-zinc-800 text-center space-y-2 select-none">
      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
        Circular Seating Direction Guide
      </div>
      <svg viewBox="0 0 180 180" className="w-36 h-36 mx-auto">
        <circle cx="90" cy="90" r="50" fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="4 4" />
        {/* Seats */}
        {[
          { label: 'A', x: 90, y: 30, color: '#f59e0b' },
          { label: 'B', x: 142, y: 60, color: '#38bdf8' },
          { label: 'C', x: 142, y: 120, color: '#38bdf8' },
          { label: 'D', x: 90, y: 150, color: '#f59e0b' },
          { label: 'E', x: 38, y: 120, color: '#10b981' },
          { label: 'F', x: 38, y: 60, color: '#10b981' },
        ].map((seat, i) => (
          <g key={i}>
            <circle cx={seat.x} cy={seat.y} r="12" fill="#181a24" stroke={seat.color} strokeWidth="1.5" />
            <text x={seat.x} y={seat.y + 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              {seat.label}
            </text>
          </g>
        ))}
        {/* Center label */}
        <text x="90" y="88" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
          FACING
        </text>
        <text x="90" y="100" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
          CENTER
        </text>
      </svg>
      <div className="text-[10px] text-zinc-400">
        Facing Center: Right is Counter-Clockwise ↺
      </div>
    </div>
  );
};
